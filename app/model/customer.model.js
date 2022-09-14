
const db= require('../common/connect');
const nodemailer = require("nodemailer");
const CUSTOMER=function(book){
    this.id= book.id;
    this.name=book.name

}
 async function sendMail(newpassword,mailAddress){
    let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: "akumaraito1@gmail.com", // generated ethereal user
              pass: "ggwldkbbvprvqkts", // generated ethereal password
            },
          });
          try {
            await transporter.sendMail({
                from: '"ADMIN" <akumaraito1@gmail.com>', // sender address
                to: `${mailAddress}`, // list of receivers
                subject: "New password ", // Subject line
                text: `${newpassword}`, // plain text body
               
          });
          } catch (error) {
            console.log(error);
          }
            
}


CUSTOMER.M_updateVote=function(id,data,resoult){

    db.query(`UPDATE danhgia SET VOTE = ? WHERE MADG=?`,[data.start,id],function(err,res){
        if(err){    resoult({message:err.message, suscess:false}) }
        else  { resoult({message:"suscess", suscess:true}) }
    })
    

}
CUSTOMER.M_register=function(data,resoult){

    db.query(`select * from admin where TAIKHOAN=?`,data.SDT,function(err,res){
        if(res.length==0){ 
            db.query(`insert into khachhang  SET ?`, data,function(err,res){
            if(err){    resoult({message:err.message, suscess:false}) }
            else resoult({MAKH :res.insertId, TEN:data.TEN, HINHANH: data.HINHANH,suscess:true,admin:false})
         }) 
    }
        else resoult({message:"SDT ĐÃ ĐƯỢC ĐĂNG KÝ admin", suscess:false})

    })
    

}


CUSTOMER.M_updateCartAmount=function(data,resoult){
   
    db.query(`select * from donhang where MAKH=? AND TRANGTHAI=0` ,data.kh,function(err,res){
        if(err || res.length==0) resoult({success:false})
        else{

            db.query(` UPDATE ctdonhang SET SL = ? WHERE (MADH=? AND MASP=?)`,[data.amount,res[0].MADH,data.id],function(err,res){
                if(err ) {    resoult({err,suscess:false}) }
                else { 

                    resoult({res,success:true}) }    
            })
        }
    })
  
}
CUSTOMER.M_deleteCart=function(data,resoult){
   
    db.query(`select * from donhang where MAKH=? AND TRANGTHAI=0` ,data.kh,function(err,res){
        if(err || res.length==0) resoult({success:false})
        else{
            
            db.query(` select * from ctdonhang where MADH=? AND MASP=?`,[res[0].MADH,data.id],function(err,res){
                if(err ) {    resoult({err,suscess:false}) }
                else { 
                    db.query(`DELETE FROM ctdonhang WHERE (MACT = ?)`,res[0].MACT,function(err,res){
                        if(err ) {    resoult({err,suscess:false}) }
                        else{
                            resoult({res,success:true}) 
                        }
                    })
                     
                }    
            })
        }
    })
}

CUSTOMER.M_login=function(data,resoult){
   
    console.log(data);

    db.query(`select * from admin where TAIKHOAN= ? and MATKHAU= ?`,[data.SDT,data.MATKHAU],function(err,res){
     
            if(res.length!=0){ 
                console.log(res[0]);
                resoult({ TEN:res[0].TEN,TAIKHOAN:res[0].TAIKHOAN,suscess:true,admin:true})
            } 
            else {
                db.query(`select * from khachhang where SDT= ? and MATKHAU= ?`,[data.SDT,data.MATKHAU],function(err,res){
                    if(err){    resoult({message:err.message, suscess:false}) }
                    //  else if(res.length!=0) resoult(res[0])
                     else if(res.length!=0) resoult({MAKH :res[0].MAKH, TEN:res[0].TEN, HINHANH: res[0].HINHANH,suscess:true,admin:false})
                    else resoult({suscess:false})
                 }) 
      

   }   })
}

CUSTOMER.M_getBought=function(id,resoult){
    
  db.query(`SELECT x.* , dg.VOTE ,dg.MADG
  from danhgia dg,
  
  (select sp.TENSP, sp.IMG, x.MASP
  from sanpham sp,
  (select DISTINCT  x.MASP 
  from 
  (SELECT   hd.*, r.MASP
      FROM donhang hd
      RIGHT JOIN (
        SELECT   MADH , MASP
        FROM ctdonhang 
      ) r ON r.MADH = hd.MADH
  WHERE  MAKH=? AND TRANGTHAI=2) x) x
  where x.MASP=sp.MASP) x
  
  where x.MASP=dg.MASP AND dg.MAKH=?`,[id,id],function(err,res){
    if(err) return resoult({message:err.message, success:false})
    else return resoult({data:res, success:true})
  })
}
// CUSTOMER.M_getBought=function(id,resoult){
    
//     db.query(`SELECT   hd.*, r.MASP
//     FROM donhang hd
//     RIGHT JOIN (
//       SELECT   MADH , MASP
//       FROM ctdonhang 
     
//     ) r ON r.MADH = hd.MADH
// WHERE  MAKH=? AND TRANGTHAI=2`,id,function(err,res){
//         if(err){     resoult(err) }
//         else {
//            resoult({value:res,success:true});
//         }
//     })
// }
CUSTOMER.M_cancelOder=function(id,resoult){
    
    db.query(`update donhang set TRANGTHAI=3  where MADH=?`,id,function(err,res){
        if(err){     resoult(err) }
        else {
           resoult({value:res,success:true});
        }
    })
}
CUSTOMER.M_getDeltalByMAHD=function(id,resoult){
    

    db.query(`select dh.*,sp.IMG,sp.TENSP FROM ctdonhang dh
    INNER  JOIN sanpham sp
    on sp.MASP = dh.MASP and dh.MADH=?`,id,function(err,res){
        if(err){     resoult(err) }
        else {
           resoult({value:res,success:true});
        }
    })
}
CUSTOMER.M_getOdered=function(id,resoult){
    
    db.query(`select * from donhang where MAKH=? and TRANGTHAI!=0 and TRANGTHAI!=3`,id,function(err,res){
        if(err){     resoult(err) }
        else {
           resoult({value:res,success:true});
        }
    })
}
CUSTOMER.M_getReview=function(idsp,idkh,resoult){
    
    db.query(`SELECT   sp.TENSP , dg.*
    FROM sanpham sp
    RIGHT JOIN (
      SELECT  *
      FROM danhgia 
    ) dg ON dg.MASP = sp.MASP
    where MAKH=? AND dg.MASP =?`,[idkh,idsp],function(err,res){
        if( err){ resoult({err,suscess:false})}
        else if(res.length!=0){
            resoult({data:res[0],success:true})
        }
        else {
            db.query(`select TENSP from sanpham where MASP =?`,idsp,function(err,res){
                if( err){ resoult({err,suscess:false})}
                else { resoult({data:{
                    TENSP:res[0].TENSP,
                    VOTE:0
                },success:true}) }
            })
        }
    })
}
CUSTOMER.M_profile=function(id,resoult){
    
    db.query(`select * from khachhang where MAKH=?`,id,function(err,res){
        if(err){     resoult(err) }
        else {
           resoult(res[0]);
        }
    })
}
CUSTOMER.M_oderNow=function(id,resoult){
    const today = new Date();
    const day = today.getDate();        // 24
    const month = today.getMonth();     // 10 (Month is 0-based, so 10 means 11th Month)
    const year = today.getFullYear();   // 2020
    // console.log(`update donhang set  TRANGTHAI=1, DATE="${year}-${month+1}-${day}" where MAKH=? and TRANGTHAI=0`)

    db.query(`update donhang set  TRANGTHAI=1, DATE="${year}-${month+1}-${day}" where MAKH=? and TRANGTHAI=0`,id,function(err,res){
        if(err){     resoult(err) }
        else {
           resoult({suscess:true});
        }
    })
}

CUSTOMER.M_getCart=function(id,resoult){
   db.query(`
   select dh.MASP,sp.TENSP, dh.SL, sp.IMG, sp.GIASP FROM ctdonhang dh
   INNER JOIN sanpham sp
   on sp.MASP = dh.MASP and dh.MADH=(SELECT MADH FROM donhang where TRANGTHAI=0 and MAKH=?)`,id,function(err,res){
    if(err){     resoult({message:err.message,suscess:false}) }
        else {
            if(res.length==0)
           resoult({suscess:false});
           else  resoult({res,suscess:true});
        }
   })
}

CUSTOMER.M_update=function(id,data, resoult){
    db.query(`UPDATE khachhang  SET ? WHERE MAKH=?`, [data,id],function(err,res){
        if(err){    resoult({err,suscess:false}) }
        else resoult({...data,suscess:true})
    })
}
CUSTOMER.M_reset=function(data,resoult){
    console.log(data)
    db.query(`select * from khachhang where SDT= ? AND EMAIL= ? `,[data.SDT,data.EMAIL],function(err,res){
        if(err || res.length==0){     resoult({suscess:false}) }
        else {
           var newpassword = Math.floor(Math.random() * 999999) + 100000;
        //    console.log(newpassword);
           db.query(`UPDATE khachhang  set MATKHAU=${newpassword} WHERE SDT= ? AND EMAIL= ?  `,[data.SDT,data.EMAIL],  function(err,res){

            if(err){    resoult({suscess:false}) }
            else {
                try {
                    sendMail(newpassword,data.EMAIL)
                    resoult({suscess:true})
                } catch (error) {
                    console.log(error.message)
                    resoult({suscess:false})
                }
            }
           })
        }
    })
}

CUSTOMER.M_updateCart=function(id,data, resoult){
    db.query(`SELECT * FROM donhang where TRANGTHAI=0 and MAKH=?`,id,function(err,res){
        if(err){    resoult({err,suscess:false}) }  
        else if(res.length==0){
            db.query(`INSERT INTO donhang (MAKH, TRANGTHAI) VALUES (?, 0)`,id,function(err,res){
                if(err){    resoult({err,suscess:false}) }
                else{
                    db.query(`select * from donhang where MAKH=? AND TRANGTHAI=0`,id,function(err,res){
                        if(err|| res.length==0){    resoult({err,suscess:false}) }
                        else{
                           
                            db.query(`INSERT INTO web_shop.ctdonhang ( MADH, MASP, SL, GIA) VALUES (?, ?, 1, ?)`, [res[0].MADH,data.MASP,data.GIASP],function(err,res){
                                if(err){    resoult({err,suscess:false}) }
                                else{
                                    resoult({res,suscess:true})
                                }
                            })
                        }
                    })
                }
            });
        }
        else{       // khach da co gio hang
            var saveMHD=res[0].MADH;
           db.query("SELECT * FROM ctdonhang where MADH=? and MASP=?",[res[0].MADH,data.MASP],function(err,res){
            if(err){    resoult({err,suscess:false}) }
            else if(res.length==0){
                db.query(`INSERT INTO ctdonhang (MADH, MASP,SL,GIA) VALUES (?, ? ,1, ?)`,[saveMHD,data.MASP,data.GIASP],function(err,res){
                    if(err|| res.length==0){    resoult({err,suscess:false}) }
                    else resoult({res,suscess:true})

                })

            }
            else{
                var NEWsl= res[0].SL+1
                db.query("UPDATE ctdonhang SET SL = ? WHERE (MACT = ?)",[NEWsl,res[0].MACT],function(err,res){
                    if(err){    resoult({err,suscess:false}) }
                    else{
                        resoult({res,suscess:true})
                    }
                })

            }
           })
        }
    })
}
module.exports = CUSTOMER;

