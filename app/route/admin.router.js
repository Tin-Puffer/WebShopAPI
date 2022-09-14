

 var admin = require('../controller/admin.controller');
 const multer = require('multer')
module.exports = function(router){
   
    // lấy sp đã được đặt
     router.get('/admin/getconfirm',admin.getConfirm);


     router.post('/admin/configoder/:id',admin.ConfigOder);

     
     router.post('/admin/getdate',admin.getDay);


     router.post('/admin/getmonth',admin.getMonth);



 };
 