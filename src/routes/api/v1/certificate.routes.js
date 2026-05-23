const express=require('express');
const { Certificate_controller } = require('../../../controller/index.controller');
const { authentication } = require('../../../middleware/Auth');
const router=express.Router();


router.get('/getCertificate',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllCertificate',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.post('/addCertificate',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})

      console.log(req.body);
});

router.post('/createCertificate',Certificate_controller.generateCertificate);

router.put('/updateCertificate/:id',(req,res)=>{
   res.status(200).json({message:'update successfully'});

    console.log(req.params.id);
});

router.delete('/deleteCertificate/:id',(req,res)=>{
//    onsole.log(req.query.id);
    
    res.status(200).json({message:'delete successfully'});

    console.log(req.params.id); 
});

module.exports=router