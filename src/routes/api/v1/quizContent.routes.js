const express=require('express');
const {  quizContent_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getquizContent',quizContent_controller.getQuizContent);

router.get('/getAllquizContent',quizContent_controller.getAllQuizContent);

router.post('/addquizContent',quizContent_controller.addQuizContent);

router.put('/updatequizContent/:id',quizContent_controller.updateQuizContent);

router.delete('/deletequizContent/:id',quizContent_controller.deleteQuizContent);

module.exports=router