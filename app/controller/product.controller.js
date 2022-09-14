const bodyParser = require('body-parser');


var Product= require('../model/product.model');


exports.getByCategory = function (req, res) {
    var data= req.body;
    Product.M_getByCategor(data,function(datax){

        res.send({resoult :datax});
    })
}
exports.addProduct = function (req, res) {
    var data= req.body;
    Product.M_addProduct(data,function(datax){

        res.send({resoult :datax});
    })
}

exports.update = function (req, res) {
    var data= req.body;
    Product.M_update((req.params.id),data,function(datax){

        res.send({resoult :datax});
    })
    
    
}

exports.getFullDetail = function (req, res) {
    Product.M_getFullDetail((req.params.id),function(data){

        res.send({resoult :data});
    })
    
    
}
exports.getfive = function (req, res) {
    Product.M_getFive((req.params.id),function(data){

        res.send({resoult :data});
    })
    
    
}
exports.getall = function (req, res) {
    var data= req.body;
    Product.M_getAll(data,function(datax){

        res.send({resoult :datax});
    })
    
}
