const express=require('express');
const { checkout_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getCheckout/:id',checkout_controller.getCheckout);

router.get('/getAllCheckout',checkout_controller.getAllCheckout);

router.post('/addCheckout',checkout_controller.addCheckout);

router.put('/updateCheckout/:id',checkout_controller.updateCheckout);

router.delete('/deleteCheckout/:id',checkout_controller.deleteCheckout);

module.exports=router