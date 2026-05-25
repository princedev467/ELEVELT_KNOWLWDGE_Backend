const express=require('express');
const { Review_controller } = require('../../../controller/index.controller');
const router=express.Router();




router.get('/getAllReview',Review_controller.getAllReview);

router.post('/addReview',Review_controller.addReview);

router.put('/updateReview/:id',Review_controller.updateReview);

router.delete('/deleteReview/:id',Review_controller.deleteReview);

module.exports=router