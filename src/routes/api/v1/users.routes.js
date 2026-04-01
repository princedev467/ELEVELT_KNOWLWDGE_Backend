const express = require('express');
const { user_controller } = require('../../../controller/index.controller');
const passport = require('passport');
const { generateToken } = require('../../../controller/user.controller');
const createPdf = require('../../../service/pdfMake');
const router = express.Router();

router.post('/register',(req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

}, user_controller.register);

router.post('/login',(req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

}, user_controller.login); 

router.post('/userVerify',(req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

}, user_controller.userVerify);

router.post('/forgetPassword', (req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

},user_controller.forgetPassword)


router.post('/resetPassword', (req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

},user_controller.resetPassword)


router.post('/GenerateToken',(req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

}, user_controller.GenerateToken);

router.post('/LogOut',(req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

}, user_controller.LogOut);

router.get('/checkAuth',(req,res,next)=>{ 
     // #swagger.tags = ['User']

next();

}, user_controller.checkAuth);


router.get('/createPdf',createPdf);
//  ----->  Google Authentication  <-----   //
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
 async function (req, res) {
    console.log("callback:",req.user);
    
    // Successful authentication, redirect home.
     const { accessToken, refressToken } = await generateToken(req.user._id)
            console.log(accessToken, refressToken);
    
            const accOpt = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 60 * 60 * 1000
            }
    
            const refOpt = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
    
            return res
                .cookie("accessToken", accessToken, accOpt)
                .cookie("refressToken", refressToken, refOpt)
                .status(200)
                .redirect('https://elevelt-knowlwdge-frontend.vercel.app');
  });



//  ----->  Facebook  Authentication  <-----   //
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router