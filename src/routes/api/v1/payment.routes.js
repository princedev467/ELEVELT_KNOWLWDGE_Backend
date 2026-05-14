const express=require('express');
const { payment_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getpayment',payment_controller.getPayment);

router.get('/getAllpayment',payment_controller.getAllPayment);

router.post('/addpayment',payment_controller.addPayment);

router.put('/updatepayment/:id',payment_controller.upadatePayment);

router.delete('/deletepayment/:id',payment_controller.deletePayment);


router.post("/create-order",payment_controller.createOrder);
router.post("/verify-payment", payment_controller.verifyPayment);

module.exports=router