const express=require('express');
const {  blogComment_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getBlogComment',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllBlogComment',blogComment_controller.getAllBlogComment);

router.post('/addBlogComment',blogComment_controller.addBlogComment)



router.put('/updateBlogComment/:id',blogComment_controller.updateBlogComment);

router.delete('/deleteBlogComment/:id',blogComment_controller.deleteBlogComment);

module.exports=router