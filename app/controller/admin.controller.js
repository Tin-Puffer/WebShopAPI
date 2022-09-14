const bodyParser = require('body-parser');


var Admin= require('../model/admin.model');


exports.ConfigOder = function (req, res) {
    var data= req.body;
    Admin.M_ConfigOder((req.params.id),data,function(datax){
        
        res.send({resoult:datax});
        
    })
}
exports.getConfirm = function (req, res) {

    Admin.M_getConfirm(function(datax){
        // if(datax.suscess)
        res.send({resoult:datax});
        // else res.send({reslout:"SDT Đã Được Đăng Ký"})
    })
}
exports.getDay = function (req, res) {
    var data= req.body;
    Admin.M_getDay(data,function(datax){
        // if(datax.suscess)
        res.send({resoult:datax});
        // else res.send({reslout:"SDT Đã Được Đăng Ký"})
    })
}
exports.getMonth = function (req, res) {
    var data= req.body;
    Admin.M_getMonth(data,function(datax){
        // if(datax.suscess)
        res.send({resoult:datax});
        // else res.send({reslout:"SDT Đã Được Đăng Ký"})
    })
}
