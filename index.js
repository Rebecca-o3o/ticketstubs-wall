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
const {s3Url} = require('./config.json');


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

// app.use(require('cookie-parser')());

app.use(csurf());

app.use(function(req,res,next){
    res.cookie('wall_-t', req.csrfToken());
    next();
});

//use the root
app.use(express.static('./public'));


// ===== S3 upload ===== start ===== //

if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
} else {
    secrets = require('./secrets');
}

//create S3 client
const client = knox.createClient({
    key: secret.AWS_KEY,
    secret: secret.AWS_SECRET,
    bucket: 'rkticketstubswall'
});


//upload files
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {

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
    // console.log("fn. uploader to s3:", req.file.filename, req.body);

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
        res.json({
            success: wasSuccessful
        });
        if(wasSuccessful) {

            db.addTicketStub(
                req.file.filename,
                req.session.user.id,
                req.body.event,
                req.body.date,
                req.body.time,
                req.body.venue
            ).then(()=>{
                console.log("stub inserted to DB");

            });
            // console.log("about to delete local file");
            fs.unlink(req.file.path);
        }
    });
}
// ===== S3 upload ===== end ===== //

// ===== Routes ===== //

app.get('/', function(req, res){
    // console.log("Route / - session User:", req.session.user);
    // if(req.session.user){
        res.sendFile(__dirname + '/index.html');
    // }
    // else {
    //     return res.redirect('/welcome/');
    // }
});

app.get('/welcome/', function(req, res){
    // console.log("Route /welcome - session User:", req.session.user);
    if(req.session.user){
        return res.redirect('/');
    }
    else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.post('/register', function (req, res){
    // console.log("starting post to DB");
    db.hashPassword(req.body.password).then((hash)=>{
        var queryValues = [req.body.first, req.body.last, req.body.email, hash];
        return db.addUser(queryValues).then((result)=>{
            // console.log("logging result");
            // console.log(result.rows);
            // req.session.user.id = result.rows[0].id;
            // req.session.user.id = result;
            req.session.user = result.rows;
            res.json({
                success: true
            });
        }).catch((err)=>{
            console.log(err);
            res.json({
                success: false
            });
        });
    });
});

app.post('/login', (req,res)=>{
    // console.log("login route with emeail:", req.body.email);

    var email = req.body.email;
    // var pw = req.body.password;

    db.getHashandUser(email).then((result)=>{
        // console.log(result.rows[0].password);        //hashed pw from db
        db.checkPassword(req.body.password, result.rows[0].password).then((pw)=>{
            if(pw) {
                // console.log("matched");
                // console.log("about to set session.user with id:", result.rows[0].id);
                // req.session.user = result.rows[0].id;

                req.session.user = {
                    id: result.rows[0].id,
                    first: result.rows[0].first,
                    last: result.rows[0].last,

                };

                // console.log("success user is:", req.session.user);

                res.json({
                    success: true
                });
            } else {
                console.log("no match");
                res.json({
                    success: false
                });
            }
        });
    }).catch((err)=>{
        console.log(err);
        res.json({
            success: false
        });
    });
});

app.post('/UploadTicketStub', uploader.single('file'), uploadToS3, function(req, res) {

    if (req.file) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});

app.post('/api/delete', function(req,res){
    // console.log("about to delete REQ BODY:",req.body);

    const userId = req.session.user.id;
    const stubId = req.body.stubId;

    db.deleteStub(stubId, userId).then(function(result){
        // console.log(result);
        res.json({
            success: true
        });
    }).catch(function(err){
        console.log(err);
    });
});

app.post('/api/edit', function(req,res){
    // console.log("about to edit REQ BODY:",req.body);

    const userId = req.session.user.id;
    var queryValues = [userId, req.body.id, req.body.event, req.body.date, req.body.time, req.body.venue];

    // console.log("sending queryValues to DB", queryValues);

    db.updateStub(userId, req.body.id, req.body.event, req.body.date, req.body.time, req.body.venue).then(function(result){
        // console.log(result);
        res.json({
            success: true
        });
    }).catch(function(err){
        console.log(err);
    });
});


app.get('/api/getTicketstubs/:userid', function(req, res){
    // console.log("/api/getTicketstubs/:userid- session User:", req.session.user);
    db.getStubsLists(req.session.user.id).then(function(stubs){

        // console.log(stubs);
        res.json(stubs);

    }).catch(function(err){
        console.log(err);
    });
});

app.get('/api/logout', (req, res) => {
    // console.log("user has logged out / was:", req.session.user);
    // req.session.user = null;
    req.session = null;
    return res.redirect('/welcome/');
});

// ===== * ===== //

app.get('*', function(req, res) {
    // console.log("Route * - session User:", req.session.user);
    // if(req.session.user){
    //     res.sendFile(__dirname + '/index.html');
    // }
    // else {
        return res.redirect('/');
    // }
});

// ===== Server ===== //

const port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});
