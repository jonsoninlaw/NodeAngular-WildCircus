var db = require('../db');

var Event = {
    getEvents: function(callback) {
        return db.query('SELECT * FROM event', callback);
    },

    createEvent: function (Event, callback) {
        return db.query('INSERT INTO event(name, price, date, capacity) values(?, ?, ?, ?)',[Event.name, Event.price, Event.date, Event.capacity], callback);
    },

    updateEvent: function (eventId, symbol, callback) {
        if (symbol == "+") {
            return db.query('UPDATE event SET capacity = capacity + 1 WHERE id = ?', [eventId], callback);
        } else {
            return db.query('UPDATE event SET capacity = capacity - 1 WHERE id = ?', [eventId], callback);
        }
    }
}

module.exports = Event;