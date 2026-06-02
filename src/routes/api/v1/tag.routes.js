const express=require('express');
const { tag_controller } = require('../../../controller/index.controller');
const router=express.Router();




router.get('/getAllTag',tag_controller.getAllTag);

router.post('/addTag',tag_controller.addTag)

router.put('/updateTag/:id',tag_controller.updateTag);

router.delete('/deleteTag/:id',tag_controller.deleteTag);

module.exports=router