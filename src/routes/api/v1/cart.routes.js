const express=require('express')
const router=express.Router();


router.get('/getcart',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllcart',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addcart',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updatecart/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deletecart/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router