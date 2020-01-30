var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var DeleteUserEvent = require('./DeleteUserEvent');
var User = require('../user/User');
var Event = require('../event/Event');
var cors = require('cors');

router.use(cors());

router.post('/', function (req, res) {
    console.log("wtf");
    DeleteUserEvent.deleteUserEvent(req.body,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(count);
            User.updateUserMoney(req.body.userId, req.body.money, "-"), function() {};
            Event.updateEvent(req.body.eventId, "-"), function() {};
        }
    });
});

module.exports = router;