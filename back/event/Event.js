var db = require('../db');

var Event = {
    getEvents: function(callback)
    {
        return db.query('SELECT * FROM event', callback);
    },
    createEvent: function (Event, callback) {
        return db.query('INSERT INTO event(name, price, date, capacity) values(?, ?, ?, ?)',[Event.name, Event.price, Event.date, Event.capacity], callback);
    }
}

module.exports = Event;