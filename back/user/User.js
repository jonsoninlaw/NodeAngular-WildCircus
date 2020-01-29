var db = require('../db');

var User = {
    createUser: function (User, callback) {
        return db.query('INSERT INTO user(nickname, email, password) values(?, ?, ?)',[User.nickname, User.email, User.password], callback);
    },

    getUserByEmail: function (query, callback) {
        return db.query('SELECT * FROM user WHERE email = ?', query.email, callback);
    }
}

module.exports = User;