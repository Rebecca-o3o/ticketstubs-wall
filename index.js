const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const knox = require('knox');
const multer = require('multer');
const path = require('path');
const uidSafe = require('uid-safe');

//own modules

let secret;

if (process.env.NODE_ENV == 'production') {
  secret = process.env;
} else {
  secret = require('./secrets');
}

const db = require('./database');

// ===== Middlewares ===== //

// reduce file size of every response
app.use(compression());

//use build file as middleware when in DEV environment
if (process.env.NODE_ENV != 'production') {
  app.use(require('./build'));
}

app.use(require('body-parser').json());

app.use(cookieSession({
  secret: secret.cookieSecret,
  maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(csurf());

app.use(function(req, res, next) {
  res.cookie('wall_-t', req.csrfToken());
  next();
});

//use the root
app.use(express.static('./public'));


// ===== S3 upload ===== //

//create S3 client
const client = knox.createClient({key: secret.AWS_KEY, secret: secret.AWS_SECRET, bucket: 'rkticketstubswall'});

//upload files
var diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function(req, file, callback) {

    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

var uploader = multer({
  storage: diskStorage,
  limits: {
    filesize: 2097152
  }
});

//upload to AWS
function uploadToS3(req, res) {

  const s3Request = client.put(req.file.filename, {
    'Content-Type': req.file.mimetype,
    'Content-Length': req.file.size,
    'x-amz-acl': 'public-read'
  });

  const fs = require('fs');

  const readStream = fs.createReadStream(req.file.path);
  readStream.pipe(s3Request);

  s3Request.on('response', s3Response => {
    const wasSuccessful = s3Response.statusCode == 200;
    res.json({success: wasSuccessful});
    if (wasSuccessful) {

      db.addTicketStub(req.file.filename, req.session.user.id, req.body.event, req.body.date, req.body.time, req.body.venue).then(() => {

      });
      fs.unlink(req.file.path);
    }
  });
}

// ===== Routes ===== //

app.get('/', function(req, res) {

  if (req.session.user) {
    res.sendFile(__dirname + '/index.html');
  } else {
    return res.redirect('/welcome/');
  }
});

app.get('/welcome/', function(req, res) {

  if (req.session.user) {
    return res.redirect('/');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.post('/register', function(req, res) {

  db.hashPassword(req.body.password).then((hash) => {
    var queryValues = [req.body.first, req.body.last, req.body.email, hash];
    return db.addUser(queryValues).then((result) => {

      req.session.user = result.rows;

      req.session.user = {
        id: result.rows[0].id,
      };

      res.json({success: true});
    }).catch((err) => {
      console.log(err);
      res.json({success: false});
    });
  });
});

app.post('/login', (req, res) => {

  var email = req.body.email;

  db.getHashandUser(email).then((result) => {

    db.checkPassword(req.body.password, result.rows[0].password).then((pw) => {
      if (pw) {

        req.session.user = {
          id: result.rows[0].id,
          first: result.rows[0].first,
          last: result.rows[0].last
        };
        res.json({success: true});

      } else {
        res.json({success: false});
      }
    });
  }).catch((err) => {
    console.log(err);
    res.json({success: false});
  });
});

app.post('/UploadTicketStub', uploader.single('file'), uploadToS3, function(req, res) {

  if (req.file) {
    res.json({success: true});
  } else {
    res.json({success: false});
  }
});

app.post('/api/delete', function(req, res) {

  const userId = req.session.user.id;
  const stubId = req.body.stubId;

  db.deleteStub(stubId, userId).then(function() {
    // TODO: delete on AWS
    res.json({success: true});
  }).catch(function(err) {
    console.log(err);
  });
});

app.post('/api/edit', function(req, res) {

  const userId = req.session.user.id;
  // var queryValues = [
  //   userId,
  //   req.body.id,
  //   req.body.event,
  //   req.body.date,
  //   req.body.time,
  //   req.body.venue
  // ];
  // console.log("sending queryValues to DB", queryValues);

  db.updateStub(userId, req.body.id, req.body.event, req.body.date, req.body.time, req.body.venue).then(function() {
    res.json({success: true});
  }).catch(function(err) {
    console.log(err);
  });
});

app.get('/api/getTicketstubs/:id', function(req, res) {
  req.params.id = req.session.user.id;

  db.getStubsLists(req.params.id).then(function(stubs) {

    res.json(stubs);

  }).catch(function(err) {
    console.log(err);
  });
});

app.get('/api/logout', (req, res) => {
  req.session = null;
  return res.redirect('/welcome/');
});

// ===== * ===== //

app.get('*', function(req, res) {

  if (req.session.user) {
    res.sendFile(__dirname + '/index.html');
  } else {
    return res.redirect('/');
  }
});

// ===== Server ===== //

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
