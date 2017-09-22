const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || require('./secrets').db);

var bcrypt = require('bcryptjs');

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

// searching for plaintextpassword of usser in users database
var getHashandUser = function (email){
    const queryText = "SELECT password, id, first, last FROM users WHERE email=$1";
    // console.log("LOGIN USER QUERY TEXT HIER:" + queryText);
    return db.query(queryText, [email]);
};

///____________________________________///



module.exports = {
    hashPassword,
    checkPassword,
    addUser,
    getHashandUser,
};
