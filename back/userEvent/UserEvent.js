var db = require('../db');

var UserEvent = {
    createUserEvent: function (query, callback) {
        return db.query('INSERT INTO ticket(event_id, user_id, quantity) values(?, ?, 1)', [query.eventId, query.userId], callback);
    },

    addUserEvent: function (UserEvent, callback) {
        return db.query('UPDATE ticket SET quantity += 1 WHERE event_id = ? AND user_id = ?', [UserEvent.eventId, UserEvent.userId], callback);
    },

    getUserEvents: function(UserEvent, callback)
    {
        return db.query('SELECT * FROM ticket where id = ?', [UserEvent.userId], callback);
    },
}

module.exports = UserEvent;