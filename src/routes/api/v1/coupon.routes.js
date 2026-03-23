const express=require('express')
const router=express.Router();


router.get('/getCoupon',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllCoupon',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addCoupon',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updateCoupon/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteCoupon/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router