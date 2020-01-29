var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'wildcircus',
    password : 'SZ%7A(mc4rY7>a6',
    database : 'wild_circus'
});
module.exports=connection;