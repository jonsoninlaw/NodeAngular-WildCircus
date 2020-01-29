var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('./User');
var cors = require('cors');

router.use(cors());

router.get('/', function (req, res) {
    User.getUserByEmail(req.query, function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.send(rows[0]);
        }
    });
});

router.post('/', function (req, res) {
    User.createUser(req.body,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            req.body.id = count.insertId;
            res.json(req.body);
        }
    });
});

module.exports = router;