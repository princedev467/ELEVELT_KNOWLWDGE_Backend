const express=require('express')
const router=express.Router();


router.get('/getWhistlist',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllWhistlist',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addWhistlist',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updateWhistlist/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteWhistlist/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router