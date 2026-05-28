const express=require('express');
const { Whistlist_controller } = require('../../../controller/index.controller');
const router=express.Router();




router.get('/getAllWhistlist',Whistlist_controller.getAllwhistlist);

router.post('/addWhistlist',Whistlist_controller.addWhistlist);

router.put('/updateWhistlist/:id',Whistlist_controller.updateWhistlist);

router.delete('/updateWhistlist/:id',Whistlist_controller.deleteWhistlist);

module.exports=router   