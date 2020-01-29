var db = require('../db');

var User = {
    createUser: function (User, callback) {
        return db.query('INSERT INTO user(nickname, email, password) values(?, ?, ?)',[User.nickname, User.email, User.password], callback);
    },

    getUserById: function (query, callback) {
        return db.query('SELECT * FROM user WHERE ID = ?', query.id, callback);
    },

    getUserByEmailAndPassword: function (query, callback) {
        return db.query('SELECT * FROM user WHERE email = ? AND password = ?', [query.email, query.password], callback);
    }
}

module.exports = User;