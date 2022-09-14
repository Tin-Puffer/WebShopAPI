var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123123',
    database: 'web_shop'
});
connection.connect(function(err) {
    if(err) { console.log(err)}
    else console.log('connection succeeded'); }
)
module.exports = connection