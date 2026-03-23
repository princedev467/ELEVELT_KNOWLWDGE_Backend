const express =require('express');
// const { course_controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');
const { Terms_controller } = require('../../../controller/index.controller');
const router=express.Router();



// http://localhost:2022/api/v1/Terms/getTerms

router.get('/getTerms/:id',Terms_controller.getTerms);  

router.get('/getAllTerms',Terms_controller.getAllTerms);

router.post('/addTerms' ,upload.single('course_img'),Terms_controller.addTerms)

router.put('/updateTerms/:id',upload.single('course_img'),Terms_controller.updateTerms)

router.delete('/deleteTerms/:id',Terms_controller.deleteTerms)



module.exports = router