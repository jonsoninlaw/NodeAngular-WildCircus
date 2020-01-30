var db = require('../db');

var User = {
    createUser: function (User, callback) {
        return db.query('INSERT INTO user(nickname, email, password, money) values(?, ?, ?, ?)',[User.nickname, User.email, User.password, User.money], callback);
    },

    getUserById: function (query, callback) {
        return db.query('SELECT * FROM user WHERE ID = ?', query.id, callback);
    },

    getUserByEmailAndPassword: function (query, callback) {
        return db.query('SELECT * FROM user WHERE email = ? AND password = ?', [query.email, query.password], callback);
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