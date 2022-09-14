const bodyParser = require('body-parser');


var Customer= require('../model/customer.model');

exports.register = function (req, res) {
    var data= req.body;
    Customer.M_register(data,function(datax){
        // if(datax.suscess)
        res.send({resoult:datax});
        // else res.send({reslout:"SDT Đã Được Đăng Ký"})
    })
}
exports.register = function (req, res) {
    var data= req.body;
    Customer.M_register(data,function(datax){
        // if(datax.suscess)
        res.send({resoult:datax});
        // else res.send({reslout:"SDT Đã Được Đăng Ký"})
    })
}

exports.updateVote = function (req, res) {
    var data= req.body;
    Customer.M_updateVote((req.params.id),data,function(datax){
        
        res.send({resoult:datax});
        
    })
}
exports.profile = function (req, res) {
    Customer.M_profile((req.params.id),function(data){

        res.send({resoult :data});
    })
    
}
exports.getReview = function (req, res) {
    Customer.M_getReview((req.params.idsp),(req.params.idkh),function(data){

        res.send({resoult :data});
    })
    
}
exports.getBought = function (req, res) {
    Customer.M_getBought((req.params.id),function(data){

        res.send({resoult :data});
    })
    
}
exports.cancelOder = function (req, res) {
    Customer.M_cancelOder((req.params.id),function(data){

        res.send({resoult :data});
    })
    
}
exports.getDeltalByMAHD = function (req, res) {
    Customer.M_getDeltalByMAHD((req.params.id),function(data){

        res.send({resoult :data});
    })
    
}
exports.getOdered = function (req, res) {
    Customer.M_getOdered((req.params.id),function(data){

        res.send({resoult :data});
    })
    
}
exports.oderNow = function (req, res) {
    Customer.M_oderNow((req.params.id),function(data){

        res.send({resoult :data});
    })
    
}

exports.deleteCart = function (req, res) {
    const data= {id   :req.params.id,
        kh: req.params.kh
    };
    Customer.M_deleteCart(data,function(datax){
         {
            res.send({resoult :datax});
        }

    })
    
}
exports.updateCartAmount= function (req, res) {

    const data= {id   :req.params.id,
        amount: req.params.amount,
        kh: req.params.kh
    };
    Customer.M_updateCartAmount(data,function(datax){
         {
            res.send({resoult :datax});
        }

    })

}
exports.login= function (req, res) {

    const data= {SDT   :req.params.loginid,
        MATKHAU: req.params.matkhau,
    };
    Customer.M_login(data,function(datax){
         {
            res.send({resoult :datax});
        }

    })

}
exports.update= function (req, res) {
    var data= req.body;
    var id=req.params.id;
  
    Customer.M_update(id,data,function(data2){
        res.send({resoult :data2});

    })
}

exports.reset= function (req, res) {
    var data= req.body;
  
    Customer.M_reset(data,function(data2){
        res.send({resoult :data2});

    })
}
exports.getCart = function (req, res) {
    Customer.M_getCart((req.params.id),function(data){

        res.send({resoult :data});
    })
    
}
exports.updateCart = function (req, res) {
    var data= req.body;
    Customer.M_updateCart(req.params.id,data,function(data){

        res.send({resoult :data});
    })
    
}
