const express =require('express');
// const { course_controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');
const { Terms_controller } = require('../../../controller/index.controller');
const router=express.Router();



// http://localhost:2022/api/v1/Terms/getTerms

router.get('/getTerms/:id',(req,res,next)=>{ 
     // #swagger.tags = ['Terms']

next();

},Terms_controller.getTerms);  

router.get('/getAllTerms',(req,res,next)=>{ 
     // #swagger.tags = ['Terms']

next();

},Terms_controller.getAllTerms);

router.post('/addTerms' ,(req,res,next)=>{ 
     // #swagger.tags = ['Terms']

next();

},Terms_controller.addTerms)

router.put('/updateTerms/:id',(req,res,next)=>{ 
     // #swagger.tags = ['Terms']

next();

},Terms_controller.updateTerms)

router.delete('/deleteTerms/:id',(req,res,next)=>{ 
     // #swagger.tags = ['Terms']

next();

},Terms_controller.deleteTerms)



module.exports = router