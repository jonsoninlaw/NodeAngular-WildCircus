var db = require('../db');

var DeleteUserEvent = {
    deleteUserEvent: function (UserEvent, callback) {
        return db.query('DELETE TOP 1 FROM ticket WHERE event_id = ? AND user_id = ?', [UserEvent.eventId, UserEvent.userId], callback);
    },
}

module.exports = DeleteUserEvent;