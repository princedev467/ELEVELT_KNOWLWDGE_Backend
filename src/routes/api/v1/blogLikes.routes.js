const express=require('express');
const {  blogLike_controller } = require('../../../controller/index.controller');
const router=express.Router();


router.get('/getBlogLikes',(req,res)=>{
    res.status(200).json({id:101,name:'prince'})
});

router.get('/getAllBlogLikes',blogLike_controller.getAllBlogLikes);

router.post('/addBlogLikes',blogLike_controller.addBlogLikes)



router.put('/updateBlogLikes/:id',blogLike_controller.updateBlogLikes);

router.delete('/deleteBlogLikes/:id',blogLike_controller.deleteBlogLikes);

module.exports=router