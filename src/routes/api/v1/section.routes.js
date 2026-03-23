const express=require('express')
const router=express.Router();


router.get('/getSection',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllSection',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addSection',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updateSection/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteSection/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router