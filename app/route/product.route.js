
 var product = require('../controller/product.controller');
 const multer = require('multer')
module.exports = function(router){
   
    //get 5 product
     router.get('/product/rs:id',product.getfive);


     router.get('/product/fulldetail/:id',product.getFullDetail);

     router.put('/product/update/:id',product.update);


     router.post('/product/allproducts',product.getall);

     // GET THEO CATOGORY
     router.post('/product/category',product.getByCategory);

     router.post('/product/add',product.addProduct);
     
    

 };