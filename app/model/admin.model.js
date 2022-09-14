const db= require('../common/connect');
const ADMIN=function(book){
    this.id= book.id;
    this.name=book.name

}
ADMIN.M_ConfigOder= function(id,data,resoult){

    const Sc= true
    db.query('UPDATE donhang SET TRANGTHAI = 2 WHERE (MADH = ?)',id,function(err,res){
        if(err){ resoult({success:false,message:err.message})}
        else{
            data.list.map(e=>{
                db.query(`SELECT * from danhgia where MASP=? AND MAKH=?`,[e,data.MAKH],function(err,res){
                    if(err)
                    {
                        console.log(err);
                    }
                    else{

                        if(res.length===0){
                            db.query('INSERT INTO danhgia (MASP, MAKH, VOTE) VALUES (?,? , ?)',[e,data.MAKH,0],function(err,res){
                                        if(err) {
                                            console.log(err) 
                                            Sc=false}
                                        else { console.log("dax them ssp: ",e) }
                             })
                        }

                    }
                })
            })
            resoult({suscess:Sc})
        }
    })
}


ADMIN.M_getConfirm=function(resoult){

    db.query(` SELECT kh.MAKH,kh.TEN,kh.SDT,kh.EMAIL,kh.DIACHI, dh.MADH, dh.TRANGTHAI, dh.DATE
    FROM khachhang kh 
    RIGHT JOIN (
      SELECT *
      FROM donhang 
    ) dh ON dh.MAKH = kh.MAKH
WHERE dh.TRANGTHAI=1
`,function(err,res){
        if(err){    resoult({message:err.message, success:false}) }
        else  { resoult({data:res, success:true}) }
    })
    

}
ADMIN.M_getDay=function(data,resoult){

    db.query(` select  p.MADH,p.MAKH,p.DATE,r.SL,r.TOTAL
    from donhang p
    inner JOIN (
              SELECT MADH, count(*)SL ,sum(GIA*SL) TOTAL
              FROM ctdonhang 
              GROUP BY MADH
            ) r ON r.MADH = p.MADH
    where DATE between ? and ? and TRANGTHAI=2
`,[data.from,data.to],function(err,res){
        if(err){    resoult({message:err.message, success:false}) }
        else  { resoult({data:res, success:true}) }
    })
}

ADMIN.M_getMonth=function(data,resoult){
    db.query(`select  p.MADH,p.MAKH,p.DATE,r.SL,r.TOTAL
    from donhang p
    inner JOIN (
              SELECT MADH, count(*)SL ,sum(GIA*SL) TOTAL
              FROM ctdonhang 
              GROUP BY MADH
            ) r ON r.MADH = p.MADH
    where MONTH(DATE)=? and year(DATE)=?  and TRANGTHAI=2
`,[data.month,data.year],function(err,res){
        if(err){    resoult({message:err.message, success:false}) }
        else  { resoult({data:res, success:true}) }
    })
}
module.exports = ADMIN;