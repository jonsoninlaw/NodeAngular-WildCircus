var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('./UserEvent');
var cors = require('cors');

router.use(cors());

router.get('/', function (req, res) {
    Event.getUserEvents(function(err,rows){
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
    User.createUserEvent(req.body,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(req.body);
        }
    });
});

module.exports = router;