var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('./User');
var cors = require('cors');

router.use(cors());

router.post('/', function (req, res) {
    User.updateUserMoney(req.body.userId, req.body.money, "+", function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(count);
        }
    });
});

module.exports = router;