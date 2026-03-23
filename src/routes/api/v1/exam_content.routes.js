const express=require('express')
const router=express.Router();


router.get('/getExam_content',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllExam_content',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addExam_content',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.put('/updateExam_content/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteExam_content/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router