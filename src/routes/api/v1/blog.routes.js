const express =require('express');
const { blog_controller } = require('../../../controller/index.controller');
const upload = require('../../../middleware/upload');
const router=express.Router();



// http://localhost:2022/api/v1/course/getCourse

router.get('/getblog',(req,res)=>{
    res.status(200).json({id:101,name:'abc'})
});

router.get('/getAllblog',blog_controller.getAllblog);

router.post('/addblog',upload.array('blog'),blog_controller.addblog)



router.put('/updateblog/:id',upload.array('blog'),blog_controller.updateblog)

router.delete('/deleteblog/:id',blog_controller.deleteblog)

module.exports = router