const express=require('express');
const { content_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getContent',content_controller.getContent);

router.get('/getAllContent',content_controller.getAllContent);

router.post('/addContent',content_controller.addContent);

router.put('/updateContent/:id',content_controller.updateContent);

router.delete('/deleteContent/:id',content_controller.deleteContent);

module.exports=router