const express= require('express');
const router=express.Router()

const CourseRoutes=require('./course.routes')
const termsRoutes=require('./Terms.routes');
const cardRoutes=require('./card.routes');
const blogRoutes=require('./blog.routes');
const userRoutes=require('./user.routes');
const admissionRoutes=require('./admission.routes');
const  paymentRoutes=require('./payment.routes');
const cartRoutes=require('./cart.routes');
const reviewRoutes=require('./review.routes');
const categoryRoutes=require('./category.routes');
const certificateRoutes=require('./certificate.routes');
const contentRoutes=require('./content.routes');
const couponRoutes=require('./coupon.routes');
const quizRoutes=require('./quiz.routes');
const quizcontentRoutes=require('./quizContent.routes');
const progressRoutes=require('./progress.routes');
const resultRoutes=require('./result.routes');
const sectionRoutes=require('./section.routes');
const whistlistRoutes=require('./whistlist.routes');
const usersRoutes=require('./users.routes')


// http://localhost:2022/api/v1/
router.use('/course',CourseRoutes);
router.use('/terms',termsRoutes);
router.use('/card',cardRoutes);
router.use('/blog',blogRoutes);
router.use('/User',userRoutes);
router.use('/User',usersRoutes);
router.use('/admission',admissionRoutes);
router.use('/payment',paymentRoutes);
router.use('/cart',cartRoutes);
router.use('/review',reviewRoutes);
router.use('/category',categoryRoutes);
router.use('/certificate',certificateRoutes);
router.use('/content',contentRoutes);
router.use('/coupon',couponRoutes);
router.use('/quiz',quizRoutes);
router.use('/quiz_content',quizcontentRoutes);
router.use('/progress',progressRoutes);
router.use('/result',resultRoutes);
router.use('/section',sectionRoutes);
router.use('/whistlist',whistlistRoutes);



module.exports = router