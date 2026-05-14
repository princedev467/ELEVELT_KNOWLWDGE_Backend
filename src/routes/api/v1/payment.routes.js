const express=require('express');
const { payment_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.post("/createorder",payment_controller.createOrder);


module.exports=router