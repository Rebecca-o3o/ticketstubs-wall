const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || require('./secrets').db);

var bcrypt = require('bcryptjs');


// ===== User Registration and Login Logic ===== //
var hashPassword = function (plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

var checkPassword =  function (textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            // console.log("bcrypting in progress");
            if (err) {
                console.log(err.stack);
                reject(err);
            } else {
                // console.log("resolved in DB query");
                resolve(doesMatch);
            }
        });
    });
};

var addUser =  function(queryValues){
    const queryText = 'INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
    return db.query(queryText, queryValues);
};

var getHashandUser = function (email){
    const queryText = "SELECT password, id, first, last FROM users WHERE email=$1";
    return db.query(queryText, [email]);
};


// ===== Ticket Stubs Logic ===== //
var addTicketStub = function(file, user, event, date, time, venue){

    const queryText = 'INSERT INTO userstubs (stub_img, stub_owner_id, event_name, event_date, event_time, venue) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';

    console.log("starting db query store stub image");
    return db.query(queryText, [file, user, event, date, time, venue]).then((result)=>{
        // console.log(result.rows[0]);
        return result.rows[0];
    }).catch((err)=>{
        console.log(err);
    });
};

module.exports = {
    hashPassword,
    checkPassword,
    addUser,
    getHashandUser,
    addTicketStub,
};
