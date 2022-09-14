
const db= require('../common/connect');

const PRODUCT=function(product){
    this.id= product.id;
    this.name=product.name

}
PRODUCT.M_getByCategor=function(data,resoult){
    // console.log(data.cate);
    const x=data.cate
    db.query(`SELECT p.*, r.VOTE
    FROM sanpham p 
    left JOIN (
      SELECT MASP, AVG(VOTE) VOTE
      FROM danhgia 
    ) r ON r.MASP = p.MASP AND p.LOAI="máy cưa vòng"`,x,function(err,res){
        if(err){    resoult({err,suscess:false})}
        else {
            resoult({data: res,suscess:true})
        }
    })
}
PRODUCT.M_getFive=function(data,resoult){

    //new
    if(data==0){   
        db.query(`SELECT p.*, r.VOTE
        FROM sanpham p 
        LEFT JOIN (
          SELECT MASP, AVG(VOTE) VOTE
          FROM danhgia 
          GROUP BY MASP
        ) r ON r.MASP = p.MASP
        WHERE p.TRANGTHAI!=1
        ORDER BY RAND() limit 4`,function(err,res){
            if(err) return resoult({message:err.message, success:false})
            else return resoult({success:true,data:[...res]})
        })
    }
    if(data==1){   
        db.query(`SELECT p.*, r.VOTE
        FROM sanpham p 
        LEFT JOIN (
          SELECT MASP, AVG(VOTE) VOTE
          FROM danhgia 
          GROUP BY MASP
        ) r ON r.MASP = p.MASP
        WHERE p.TRANGTHAI!=1
        ORDER BY RAND() limit 4`,function(err,res){
            if(err) return resoult({message:err.message, success:false})
            else return resoult({success:true,data:[...res]})
        })
    }
    //category
    else if(data==2){
        db.query(`SELECT DISTINCT LOAI  FROM web_shop.sanpham  ORDER BY  LOAI limit 4`,function(err,res){
            if(err) return resoult({message:err.message, success:false})
            else return resoult({success:true,data:[...res]})
        })
    }
    //rating
    else if(data==3){
        db.query(`
        SELECT p.*, r.VOTE
        FROM sanpham p 
        LEFT JOIN (
          SELECT MASP, AVG(VOTE) VOTE
          FROM danhgia 
          GROUP BY MASP
        ) r ON r.MASP = p.MASP
        WHERE p.TRANGTHAI!=1
        ORDER BY r.VOTE DESC limit 4; `,function(err,res){
            if(err) return resoult({message:err.message, success:false})
            else return resoult({success:true,data:[...res]})
        })
    }
}
PRODUCT.M_addProduct=function(data, resoult){
    db.query(`INSERT INTO sanpham (IMG, TENSP, GIASP, XUATXU, BAOHANH, LOAI, TSIMG) VALUES (?, ?, ?, ?,?, ?,?);`, 
    [data.IMG,data.TENSP,data.GIASP,data.XUATXU,data.BAOHANH,data.LOAI,data.TSIMG],
    function(err,res){
        if(err){    resoult({err,suscess:false}) }
        else resoult({...data,suscess:true})
    })
}

PRODUCT.M_update=function(id,data, resoult){
    db.query(`UPDATE sanpham  SET ? WHERE MASP=?`, [data,id],function(err,res){
        if(err){    resoult({err,suscess:false}) }
        else resoult({...data,suscess:true})
    })
}
PRODUCT.M_getFullDetail=function(id,resoult){

    db.query(`SELECT p.*, r.VOTE, r.MADG
    FROM sanpham p 
    left JOIN (
      SELECT MASP, AVG(VOTE) VOTE, COUNT(*) MADG
      FROM danhgia 
      GROUP BY MASP
    ) r ON r.MASP = p.MASP
    WHERE p.MASP=?`,id,function(err,res){
        if(err) return resoult({message:err.message, success:false})
        else
        {
            return resoult({success:true,data:res})
        }
           
    })
}
PRODUCT.M_getAll=function(data,resoult){

    db.query(`SELECT p.*, r.VOTE
    FROM sanpham p 
    left JOIN (
      SELECT MASP, AVG(VOTE) VOTE
      FROM danhgia 
      GROUP BY MASP
    ) r ON r.MASP = p.MASP
    WHERE p.TRANGTHAI!=1; `,function(err,res){
        if(err) return resoult({message:err.message, success:false})
        else
        {
            if(data.cate[0]!='-')
            {

                if(data.cate==1){
                    return resoult({success:true,data:[...res]})
                }
                else{
                    const arr=[...res]
                    const arr2=arr.filter(e=>e.LOAI==data.cate)
                    return  resoult({success:true,data:arr2})
                }
            }
            else{
                let del_str=data.cate.replace(/-/g, '');
                const arr=[...res]
                const arr2=arr.filter(e=>{
                    return e.TENSP.includes(del_str)
                })
                return  resoult({success:true,data:arr2})
            }
            
           
        }
           
    })

}
module.exports = PRODUCT;

