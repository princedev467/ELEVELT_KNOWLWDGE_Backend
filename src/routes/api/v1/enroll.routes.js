const express=require('express');
const { enrollment_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getEnroll',enrollment_controller.getEnroll);

router.get('/getAllEnroll',enrollment_controller.getAllEnroll);

router.post('/addEnroll',enrollment_controller.addEnroll)



router.put('/updateEnroll/:id',enrollment_controller.updateEnroll);

router.delete('/deleteEnroll/:id',enrollment_controller.deleteEnroll);

module.exports=router