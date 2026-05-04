const express=require('express');
const { cart_controller } = require('../../../controller/index.controller');
const router=express.Router();



router.get('/getcart',cart_controller.getCart);

router.get('/getAllcart',cart_controller.getAllCart);

router.post('/addcart',cart_controller.addCart);

router.put('/updatecart/:id',cart_controller.updateCart);

router.delete('/deletecart/:id',cart_controller.deleteCart);

module.exports=router