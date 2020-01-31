var express = require('express');
var app = express();

var EventController = require('./event/EventController');
var UserController = require('./user/UserController');
var UserEventController = require('./userEvent/UserEventController');
var MoneyController = require('./user/MoneyController');

app.use('/events', EventController);
app.use('/users', UserController);
app.use('/userEvents', UserEventController);
app.use('/earnMoney', MoneyController);

module.exports = app;