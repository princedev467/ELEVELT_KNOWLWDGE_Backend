const express=require('express');
const { Category_Controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');
const { authentication } = require('../../../middleware/Auth');
const router=express.Router();


router.get('/getCategory/:id',Category_Controller.getCategories);

router.get('/getAllCategory',Category_Controller.getAllCategories);

router.get('/activeCategory',Category_Controller.activeCategories);

router.post('/addCategory',upload.single('category_img'), Category_Controller.addCategories);
//authentication(['admin','employee','instructor','user'])

router.put('/updateCategory/:id',upload.single('category_img'),Category_Controller.updateCategories);


router.delete('/deleteCategory/:id',Category_Controller.deleteCategories);

module.exports=router