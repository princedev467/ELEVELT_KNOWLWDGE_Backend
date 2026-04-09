const express=require('express');
const { section_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getSection',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllSection',section_controller.getAllSection);

router.post('/addSection',section_controller.addSection)



router.put('/updateSection/:id',section_controller.updateSection);

router.delete('/deleteSection/:id',section_controller.deleteSection);

module.exports=router