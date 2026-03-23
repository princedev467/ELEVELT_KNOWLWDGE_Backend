const express =require('express');
const router=express.Router();



// http://localhost:2022/api/v1/course/getCourse

router.get('/getuser',(req,res)=>{
    res.status(200).json({id:101,name:'abc'})
});

router.get('/getAlluser',(req,res)=>{
    res.status(200).json()
});

router.post('/adduser',(req,res)=>{
    res.status(200).json({message:'added successfully'});

    console.log(req.body);
    
})

router.put('/updateuser/:id',(req,res)=>{
    res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
})

router.delete('/deleteuser/:id',(req,res)=>{

    console.log(req.query.id);
    
   
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id);
    
  
    
})

module.exports = router