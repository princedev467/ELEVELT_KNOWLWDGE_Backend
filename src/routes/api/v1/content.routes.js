const express=require('express')
const router=express.Router();


router.get('/getContent',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllContent',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addContent',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updateContent/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteContent/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router