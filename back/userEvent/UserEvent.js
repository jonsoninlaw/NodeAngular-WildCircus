var db = require('../db');

var UserEvent = {
    createUserEvent: function (query, callback) {
        return db.query('INSERT INTO ticket(event_id, user_id, quantity) values(?, ?, 1)', [query.eventId, query.userId], callback);
    },

    addUserEvent: function (UserEvent, callback) {
        return db.query('UPDATE ticket SET quantity += 1 WHERE event_id = ? AND user_id = ?', [UserEvent.eventId, UserEvent.userId], callback);
    },

    sellUserEvent: function (query, callback) {
        return db.query('DELETE FROM ticket WHERE event_id = ? AND user_id = ? LIMIT 1', [query.eventId, query.userId], callback);
    },

    getUserEvents: function(userId, callback) {
        return db.query('SELECT event.id, name, price, date, COUNT(*) as quantity FROM ticket LEFT JOIN event ON event.id = event_id WHERE user_id = ? GROUP BY event_id', [userId], callback);
    },
}

module.exports = UserEvent;