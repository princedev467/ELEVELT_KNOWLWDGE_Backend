const express =require('express');
const {  blogSection_controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');
const router=express.Router();




router.get('/getAllblogSection',blogSection_controller.getAllblogSection);

router.post('/addblogSection',upload.array('image'),blogSection_controller.addblogSection)



router.put('/updateblogSection/:id',upload.array('image'),blogSection_controller.updateblogSection)

router.delete('/deleteblogSection/:id',blogSection_controller.deleteblogSection)

module.exports = router