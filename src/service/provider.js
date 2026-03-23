const passport = require('passport');
const userModel = require('../model/users.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;



const googleProvider = () => {

    try {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:2022/api/v1/user/auth/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                console.log("profile:", profile);


                const userData = await userModel.findOne({ email: profile.emails[0].value })

                if (!userData) {
                    const user = await userModel.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        google_id: profile.id,
                        isVerify:true
                    })

                    return cb(null, user);
                }


                return cb(null, userData);


                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
            }
        ));


        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });

        passport.deserializeUser(async function (_id, done) {

            const user=await userModel.findById(_id);

            if(user){
                 done(null, user);
            }else{
                 done('user not exist', user);
            }
            // User.findById(_id, function (err, user) {
            //     done(err, user);
            // });
        });
    } catch (error) {

    }
}


const facebookProvider = () => {
    try {
        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:2022/api/v1/user/auth/facebook/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                console.log("profile:", profile);


                const user = await userModel.create({
                    facebook_id: profile.id,
                    name: profile.displayName,
                     
                })

                  if(user){
                 done(null, user);
            }else{
                 done('user not exist', user);
            }
                // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                //   return cb(err, user);
                // });
            }
        ));
    } catch (error) {

    }
}
module.exports = {
    googleProvider,
    facebookProvider
};