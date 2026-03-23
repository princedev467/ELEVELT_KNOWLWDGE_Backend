const express=require('express')
const router=express.Router();


router.get('/getProgress',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllProgress',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addProgress',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updateProgress/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteProgress/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router