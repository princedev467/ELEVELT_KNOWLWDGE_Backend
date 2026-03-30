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

// router.post('/addCategory', (req, res) => {
// /*
//     #swagger.auto = false
//     #swagger.tags = ['Category']
//     #swagger.consumes = ['multipart/form-data']  
//     #swagger.parameters['name'] = {
//       in: 'formData',
//       type: 'string',
//       required: 'true',
//       description: 'Category Name',
//     },
//     #swagger.parameters['description'] = {
//       in: 'formData',
//       type: 'string',
//       required: 'true',
//       description: 'Category Description',
//     },
//     #swagger.parameters['category_img'] = {
//       in: 'formData',
//       type: 'file',
//       required: 'true',
//       description: 'Category Image',
//     }
    
//   */
// })

router.put('/updateCategory/:id',upload.single('category_img'),Category_Controller.updateCategories);


router.delete('/deleteCategory/:id',Category_Controller.deleteCategories);

module.exports=router