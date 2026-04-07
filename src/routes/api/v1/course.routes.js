const express = require('express');
const router=express.Router();
const { course_controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');




// http://localhost:2022/api/v1/course/getCourse

router.get('/getCourse/:id',(req, res, next) => {
// #swagger.tags = ['course']
   next();
},course_controller.getCourses);  

router.get('/getAllCourse',(req, res, next) => {
// #swagger.tags = ['course']
   next();
},course_controller.getAllCourses);


router.post('/addCourse', upload.array('course_img') ,(req, res, next) => {
        // #swagger.tags = ['course']
    
    /*
    #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['name'] = {
      in: 'formData',
      type: 'string',
      required: 'true',
      description: 'course Name',
    },
    #swagger.parameters['description'] = {
      in: 'formData',
      type: 'string',
      required: 'true',
      description: 'course Description',
    },
    #swagger.parameters['course_img'] = {
      in: 'formData',
      type: 'file',
      required: 'true',
      description: 'course Image',
    }
       #swagger.parameters['category_id'] = {
      in: 'formData',
      type: 'text',
      description: 'category id',
    }
    
  */
        next();
    },course_controller.addCourses)
// router.post('/addCourse', upload.fields([{name:'course_img'}
//                                         ,{name:'Preview_url',maxCount:1}]) ,(req, res, next) => {
//         // #swagger.tags = ['course']
    
//     /*
//     #swagger.consumes = ['multipart/form-data']  
//     #swagger.parameters['name'] = {
//       in: 'formData',
//       type: 'string',
//       required: 'true',
//       description: 'course Name',
//     },
//     #swagger.parameters['description'] = {
//       in: 'formData',
//       type: 'string',
//       required: 'true',
//       description: 'course Description',
//     },
//     #swagger.parameters['course_img'] = {
//       in: 'formData',
//       type: 'file',
//       required: 'true',
//       description: 'course Image',
//     }
//        #swagger.parameters['category_id'] = {
//       in: 'formData',
//       type: 'text',
//       description: 'category id',
//     }
    
//   */
//         next();
//     },course_controller.addCourses)

router.put('/updateCourse/:id',upload.array('course_img'),(req, res, next) => {
        // #swagger.tags = ['course']
    
    /*
    #swagger.consumes = ['multipart/form-data']  
    #swagger.parameters['name'] = {
      in: 'formData',
      type: 'string',
      description: 'course Name',
    },
    #swagger.parameters['description'] = {
      in: 'formData',
      type: 'string',
      description: 'course Description',
    },
     #swagger.parameters['course_img'] = {
      in: 'formData',
      type: 'file',
      description: 'course Image',
    }
    
  */
        next();
    },course_controller.updateCourses)

router.delete('/deleteCourse/:id',(req, res, next) => {
// #swagger.tags = ['course']
   next();
},course_controller.deleteCourses)

router.put('/activeCourses/:id',course_controller.activeCourses)


module.exports = router