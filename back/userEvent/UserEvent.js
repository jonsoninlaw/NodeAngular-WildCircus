var db = require('../db');

var UserEvent = {
    createUserEvent: function (UserEvent, callback) {
        return db.query('INSERT INTO ticket(id, ID_user) values(?, ?)', [UserEvent.eventId, UserEvent.userId], callback);
    },

    getUserEvents: function(UserEvent, callback)
    {
        return db.query('SELECT * FROM ticket where id = ?', [UserEvent.userId], callback);
    },
}

module.exports = UserEvent;