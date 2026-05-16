const express=require('express');
const { payment_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get("/getAllPayment",payment_controller.getAllPayment);

router.post("/createorder",payment_controller.createOrder);

router.post("/verifyPayment",payment_controller.verifyPayment);


module.exports=router