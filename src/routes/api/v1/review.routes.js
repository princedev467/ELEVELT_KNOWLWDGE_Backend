const express=require('express')
const router=express.Router();


router.get('/getReview',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllReview',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addReview',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updateReview/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteReview/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router