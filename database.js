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

    const queryText = 'INSERT INTO userstubs (stub_img, stub_owner_id, event_name, event_date, event_time, venue) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, stub_img, stub_owner_id, event_name, event_date, event_time, venue';

    // console.log("starting db query store stub image");
    return db.query(queryText, [file, user, event, date, time, venue]).then((result)=>{
        // console.log(result.rows[0]);
        // return result.rows[0];

        return result.rows.map(stub=>{
            const {id, img, eventname, eventdate, eventtime, venue} = stub;
            return {
                id, eventname, eventdate, eventtime, venue,
                stubImgUrl: "https://s3.amazonaws.com/rkticketstubswall/" + img,
            };
        });

    }).catch((err)=>{
        console.log(err);
    });
};

var getStubsLists = function(userid){
    const queryText = `SELECT id, stub_img AS img, event_name AS eventName, event_date AS eventDate, event_time AS eventTime, venue FROM userstubs WHERE stub_owner_id = $1`;

    return db.query(queryText,[userid]).then(function(dbStubs){

        console.log(dbStubs);

        return dbStubs.rows.map(stub=>{
            const {id, img, eventname, eventdate, eventtime, venue} = stub;
            return {
                id, eventname, eventdate, eventtime, venue,
                stubImgUrl: "https://s3.amazonaws.com/rkticketstubswall/" + img,
            };
        });
    });
};

var deleteStub = function(stubId, user){

    const queryText = `DELETE FROM userstubs WHERE id=$1 AND stub_owner_id=$2`;
    console.log("starting db query deleteStub");

    return db.query(queryText, [stubId, user]).then(()=>{
        return {
            status: "deleted",
        };
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
    getStubsLists,
    deleteStub,
};
