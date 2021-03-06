var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var UserEvent = require('./UserEvent');
var User = require('../user/User');
var Event = require('../event/Event');
var cors = require('cors');

router.use(cors());

router.get('/', function (req, res) {
    UserEvent.getUserEvents(req.query.userId, function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.post('/', function (req, res) {
    UserEvent.createUserEvent(req.body,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(count);
            User.updateUserMoney(req.body.userId, req.body.money, "-"), function() {};
            Event.updateEvent(req.body.eventId, "-"), function() {};
            User.updateOwnerMoney(parseInt(req.body.money), "+"), function() {};
        }
    });
});

router.delete('/', function (req, res) {
    UserEvent.sellUserEvent(req.query,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(count);
            User.updateUserMoney(parseInt(req.query.userId), parseInt(req.query.money), "+"), function() {};
            Event.updateEvent(parseInt(req.query.eventId), "+"), function() {};
            User.updateOwnerMoney(parseInt(req.query.money), "-"), function() {};
        }
    });
});

module.exports = router;