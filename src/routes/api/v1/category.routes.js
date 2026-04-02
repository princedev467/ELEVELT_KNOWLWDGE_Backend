const express=require('express');
const { Category_Controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');
const { authentication } = require('../../../middleware/Auth');
const validate = require('../../../middleware/validator');
const { addCategory, updateCategory, deleteCategory } = require('../../../Validator/category.validator');
const router=express.Router();

router.get('/getAllCategory',(req, res, next) => {
// #swagger.tags = ['category']
   next();
},Category_Controller.getAllCategories);


router.get('/getCategory/:id',(req, res, next) => {
// #swagger.tags = ['category']
   next();
},Category_Controller.getCategories);




router.post('/addCategory',validate(addCategory), authentication(['user']),upload.single('category_img'),(req, res, next) => {
        // #swagger.tags = ['category']
    
    /*
    #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['name'] = {
      in: 'formData',
      type: 'string',
      required: 'true',
      description: 'Category Name',
    },
    #swagger.parameters['description'] = {
      in: 'formData',
      type: 'string',
      required: 'true',
      description: 'Category Description',
    },
    #swagger.parameters['category_img'] = {
      in: 'formData',
      type: 'file',
      required: 'true',
      description: 'Category Image',
    }
    
  */
        next();
    },Category_Controller.addCategories);

router.put('/updateCategory/:id',validate(updateCategory), authentication(['user']),upload.single('category_img'),(req, res, next) => {
        // #swagger.tags = ['category']
    
    /*
    #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['name'] = {
      in: 'formData',
      type: 'string',
      description: 'Category Name',
    },
    #swagger.parameters['description'] = {
      in: 'formData',
      type: 'string',
      description: 'Category Description',
    },
    #swagger.parameters['category_img'] = {
      in: 'formData',
      type: 'file',
      description: 'Category Image',
    }
    
  */
        next();
    },Category_Controller.updateCategories);



router.get('/activeCategory',(req, res, next) => {
// #swagger.tags = ['category']
   next();
},Category_Controller.activeCategories);


router.delete('/deleteCategory/:id', validate(deleteCategory),authentication(['user']),(req, res, next) => {
// #swagger.tags = ['category']
   next();
},Category_Controller.deleteCategories);


module.exports=router