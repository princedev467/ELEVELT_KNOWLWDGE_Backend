const express=require('express');
const { coupon_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getCoupon/:id',coupon_controller.getCoupon);

router.get('/getAllCoupon',coupon_controller.getAllCoupon);

router.post('/addCoupon',coupon_controller.addCoupon);

router.put('/updateCoupon/:id',coupon_controller.updateCoupon);

router.delete('/deleteCoupon/:id',coupon_controller.deleteCoupon);

module.exports=router