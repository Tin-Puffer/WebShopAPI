var express = require('express');
var   app = express();
var cors= require('cors');
app.use(express.json());
app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./app/route/customer.router')(app)
require('./app/route/product.route')(app)
require('./app/route/admin.router')(app)



app.listen(3000,function() { console.log("Server Run on!"); });