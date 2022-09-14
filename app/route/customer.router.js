
 var customer = require('../controller/customer.controller');
 const multer = require('multer')
module.exports = function(router){
   
    //đăng ký
     router.post('/customer/register',customer.register);


    // thông tin
     router.get('/customer/profile:id',customer.profile);

    //đăng nhập
     router.get('/customer/login/:loginid/:matkhau',customer.login);


    //thay đổi thông tin 
     router.put('/customer/update:id',customer.update);

     //rest password
     router.post('/customer/resetpassword',customer.reset);

     //Get cart
     router.get('/customer/getcart:id',customer.getCart);


    // update cart
     router.post('/customer/updatecart:id',customer.updateCart);

    // dặt lại số lượng mỗi sản phẩm
    router.put('/customer/setcartitem/:id/:amount/:kh',customer.updateCartAmount);

    // xóa sp khỏi giỏ hàng
    router.delete('/customer/deletecart/:id/:kh',customer.deleteCart);

    //đặt hàng 
    router.put('/customer/odernow/:id',customer.oderNow);

    //lấy đơn hàng đã đặt
    router.get('/customer/getodered/:id',customer.getOdered);

    //LẤY SẢN PHẨM THEO MÃ HÓA DƠN
    router.get('/customer/getbymahd/:id',customer.getDeltalByMAHD);

    //HỦY ĐƠN
    router.put('/customer/canceloder/:id',customer.cancelOder);

    //lấy những sp đã mua

    router.get('/customer/getitembought/:id',customer.getBought);
    
    //lấy tên và đánh giá của sp theo mã và id
    router.get('/customer/review/:idsp/:idkh',customer.getReview);

    //cập nhật vote 
    router.put('/customer/updatevote/:id',customer.updateVote);

//================================================================

    router.get('/file:fileName', function (req, res) {
        var filename=req.params.fileName;
        const filePath = "C:/Users/NguyenTin/Desktop/WEB_SHOP_API/images/"+filename
        
        res.sendFile(filePath);
    });


    
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'images/')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    })
    const upload = multer({ storage: storage })
    router.post('/image', upload.single('file'), function (req, res) {
      res.json({})
    })
 
 };