const express= require('express');
const router=express.Router()


const usersRoutes=require('./users.routes');
const categoryRoutes=require('./category.routes');
const CourseRoutes=require('./course.routes');
const sectionRoutes=require('./section.routes');
const contentRoutes=require('./content.routes');
const quizRoutes=require('./quiz.routes');
const quizcontentRoutes=require('./quizContent.routes');
const cartRoutes=require('./cart.routes');
const couponRoutes=require('./coupon.routes');
const checkoutRoutes=require('./checkout.routes');
const termsRoutes=require('./Terms.routes');


const cardRoutes=require('./card.routes');
const blogRoutes=require('./blog.routes');
const admissionRoutes=require('./admission.routes');
const paymentRoutes=require('./payment.routes');
const reviewRoutes=require('./review.routes');
const certificateRoutes=require('./certificate.routes');
const progressRoutes=require('./progress.routes');
const resultRoutes=require('./result.routes');
const whistlistRoutes=require('./whistlist.routes');




// http://localhost:2022/api/v1/
router.use('/User',usersRoutes);
router.use('/category',categoryRoutes);
router.use('/course',CourseRoutes);
router.use('/section',sectionRoutes);
router.use('/content',contentRoutes);
router.use('/quiz',quizRoutes);
router.use('/quiz_content',quizcontentRoutes);
router.use('/cart',cartRoutes);
router.use('/coupon',couponRoutes);
router.use('/checkout',checkoutRoutes);
router.use('/terms',termsRoutes);
router.use('/payment',paymentRoutes);

router.use('/card',cardRoutes);
router.use('/blog',blogRoutes);
router.use('/admission',admissionRoutes);
router.use('/review',reviewRoutes);
router.use('/certificate',certificateRoutes);
router.use('/progress',progressRoutes);
router.use('/result',resultRoutes);
router.use('/whistlist',whistlistRoutes);



module.exports = router