var express = require('express');
var app = express();

var EventController = require('./event/EventController');
var UserController = require('./user/UserController');
app.use('/events', EventController);
app.use('/users', UserController);

module.exports = app;