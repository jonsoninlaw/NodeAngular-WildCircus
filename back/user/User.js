const db = require('../db');
const crypto = require('crypto');

var User = {
    createUser: function (User, callback) {
        hashedPassword = crypto.pbkdf2Sync(User.password, "hello", 1000, 64, `sha512`).toString(`hex`);
        return db.query('INSERT INTO user(nickname, email, password, money) values(?, ?, ?, ?)',[User.nickname, User.email, hashedPassword, User.money], callback);
    },

    getUserById: function (query, callback) {
        return db.query('SELECT * FROM user WHERE ID = ?', query.id, callback);
    },

    getUserByEmailAndPassword: function (query, callback) {
        hashedPassword = crypto.pbkdf2Sync(query.password, "hello", 1000, 64, `sha512`).toString(`hex`);
        return db.query('SELECT * FROM user WHERE email = ? AND password = ?', [query.email, hashedPassword], callback);
    },

    updateUserMoney: function (userId, money, symbol, callback) {
        if (symbol == "+") {
            return db.query('UPDATE user SET money = money + ? WHERE id = ?',[money, userId], callback);
        } else {
            return db.query('UPDATE user SET money = money - ? WHERE id = ?',[money, userId], callback);
        }
    },
}

module.exports = User;