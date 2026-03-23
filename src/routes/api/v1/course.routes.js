const express =require('express');
const { course_controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');
const router=express.Router();



// http://localhost:2022/api/v1/course/getCourse

router.get('/getCourse/:id',course_controller.getCourses);  

router.get('/getAllCourse',course_controller.getAllCourses);

router.post('/addCourse' ,upload.single('course_img'),course_controller.addCourses)

router.put('/updateCourse/:id',upload.single('course_img'),course_controller.updateCourses)

router.delete('/deleteCourse/:id',course_controller.deleteCourses)

router.put('/activeCourses/:id',course_controller.activeCourses)


module.exports = router