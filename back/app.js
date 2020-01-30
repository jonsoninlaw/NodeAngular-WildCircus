var express = require('express');
var app = express();

var EventController = require('./event/EventController');
var UserController = require('./user/UserController');
var UserEventController = require('./userEvent/UserEventController');

app.use('/events', EventController);
app.use('/users', UserController);
app.use('/userEvents', UserEventController);

module.exports = app;