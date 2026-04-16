const express=require('express');
const { quiz_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getquiz',quiz_controller.getQuiz);

router.get('/getAllquiz',quiz_controller.getAllQuiz);

router.post('/addquiz',quiz_controller.addQuiz);

router.put('/updatequiz/:id',quiz_controller.updateQuiz);

router.delete('/deletequiz/:id',quiz_controller.deleteQuiz);

module.exports=router