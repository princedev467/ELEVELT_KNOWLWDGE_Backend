const express=require('express');
const { Progress_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getProgress',Progress_controller.getProgress);

router.get('/getAllProgress',Progress_controller.getAllProgress);

router.post('/addProgress',Progress_controller.addProgress);

router.put('/updateProgress/:id',Progress_controller.updateProgress);

router.delete('/deleteProgress/:id',Progress_controller.deleteProgress);

module.exports=router