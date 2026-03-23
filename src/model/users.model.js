const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
           required:true,
            trim: true
        },
        email: {
            type: String,
             unique: true,
            //    required:true,
             match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
        },
        password: {
            type: String
            
        },
        role: {
            type: String,
            default:'user'
        },
        mobile_no:{
             type: String
            
        },
        DOB: {
            type: String
             
        },
        google_id:{
             type: String
        },
        facebook_id:{
             type: Number
        },
        isVerify: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        OTP:{
              type: String
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const userModel = mongoose.model('users', userSchema);
module.exports = userModel