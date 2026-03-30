const transporter = require("../middleware/Email.config.js")
const userModel = require("../model/users.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendSMS = require("../service/twilio.js");

const generateToken = async (_id) => {

    try {
// #swagger.tags = ['user']
        const user = await userModel.findById(_id);

        const accessToken = jwt.sign(
            { _id, expire: '1h' }, process.env.ACCESSTOKEN_SECRET, { expiresIn: 60 * 60 });


        const refressToken = jwt.sign(
            { _id, expire: '7d' }, process.env.REFRESSTOKEN_SECRET, { expiresIn: '7d' })

        user.refreshToken = refressToken

        await user.save();
        return { accessToken, refressToken }
    } catch (error) {
        throw new error.message
    }
}

const register = async (req, res) => {
    // #swagger.tags = ['user']
    try {

        const { email, password, mobile_no } = req.body

        const existUser = await userModel.findOne({ email })

        if (existUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'user already exists'
            })
        }

        const secretPass = await bcrypt.hash(password, 10);

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();


        const user = await userModel.create({ ...req.body, password: secretPass, OTP });

        // sendSMS(mobile_no,OTP)


        await transporter.sendMail({
            from: `"prince" <${process.env.Email}>`,
            to: email,
            subject: "Verify Your Email",
            text: "Verify Your Email",
            html: `<h3>your OTP is ${OTP} </h3>`,
        });



        const userData = await userModel.findOne({ email }).select('-password -OTP');

        if (!user) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'user is not registered'
            })
        }

        return res.status(200).json({
            success: true,
            data: userData,
            message: 'user registered successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'Internal server error' + error.message
        })
    }


}

const userVerify = async (req, res) => {
    // #swagger.tags = ['user']
    try {

        const { email, OTP } = req.body

        const verifyUser = await userModel.findOne({ email, OTP })

        if (!verifyUser) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Invalid Email or OTP'
            })
        }

        verifyUser.isVerify = true

        await verifyUser.save();

        return res.status(200).json({
            success: true,
            data: verifyUser,
            message: 'user is verify'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            data: [],
            message: 'Internal Sever error' + error.message
        })
    }
}

const login = async (req, res) => {
    // #swagger.tags = ['user']

    try {
        const { email, password } = req.body

        const userLogin = await userModel.findOne({ email })

        // console.log("userLogin:",userLogin);


        if (!userLogin) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'email is not exist'
            })

        }

        const comparePass = await bcrypt.compare(password, userLogin.password)

        console.log("comparePass:", comparePass);

        if (!comparePass) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Invalid email or password"
            })
        }

        if (!userLogin.isVerify) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "user is not verifyed"
            })
        }

        const { accessToken, refressToken } = await generateToken(userLogin._id)
        console.log(accessToken, refressToken);

        // res.cookie("accessToken", accessToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        //     maxAge: 15 * 60 * 1000
        // })

        // res.cookie("refressToken", refressToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })

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
            .status(200).json({
                success: true,
                data: userLogin,
                message: 'Login successfull'
            })





    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error' + error.message
        })
    }



}

const GenerateToken = async (req, res) => {
    try {
        // #swagger.tags = ['user']
        console.log("req.cookies", req.cookies);

        const decode = await jwt.verify(req.cookies.refressToken, process.env.REFRESSTOKEN_SECRET)

        console.log("decode", decode);

        const user = await userModel.findById(decode._id)

        // console.log("user:",user); //check user

        if (!user) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "user not found"
            })


        }


        if (user.refreshToken !== req.cookies.refressToken) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "refress Token is not found"
            })
        }

        const { accessToken, refressToken } = await generateToken(user._id)


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
            .status(200).json({
                success: true,
                data: user,
                message: 'Token generated sucessfully'
            })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error' + error.message
        })
    }


}

const LogOut = async (req, res) => {
    // #swagger.tags = ['user']

    try {
        const { _id } = req.body

        const user = await userModel.findByIdAndUpdate({ _id },
            {  
                $unset: {
                    refreshToken: 1
                }
            },
            { new: true }
        )

        if (!user) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "user is not LogOut"
            })
        }

        return res
            .clearCookie("accessToken")
            .clearCookie("refressToken")
            .status(200).json({
                success: true,
                data: null,
                message: 'Logout is succcesfull'
            })


    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error' + error.message
        })
    }
}

const forgetPassword = async (req, res) => {

    try {
// #swagger.tags = ['user']
        const { email } = req.body

        const existUser = await userModel.findOne({ email })

        console.log("existUser:", existUser);

        if (!existUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: '"User not found"'
            })
        }


        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        await transporter.sendMail({
            from: `"prince" <${process.env.Email}>`,
            to: email,
            subject: "Verify Your Email",
            text: "Verify Your Email",
            html: `<h3>your OTP is ${OTP} </h3>`,
        });

        existUser.OTP = OTP;

        await existUser.save();

        return res.status(200).json({
            success: true,
            data: existUser,
            message: 'OTP send successfully'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            data: [],
            message: 'Internal Sever error' + error.message
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        // #swagger.tags = ['user']
        const Token = await req.cookies.accessToken || req.header('Authorization')?.replace("Bearer ", "")


        if (!Token) {
            return res.status(401).json({
                success: false,
                data: [],
                message: "user Logout"
            })
        }

        const decode = await jwt.verify(Token, process.env.ACCESSTOKEN_SECRET)

        if (!decode) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Token not verify"
            })
        }

        const user = await userModel.findById(decode._id)

        //   console.log("user:",user); //check user

        if (!user) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "user not found"
            })


        }

        return res.status(200).json({
            success: true,
            data: user,
            message: "user is authenticated"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error' + error.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
// #swagger.tags = ['user']
        const { email, password } = req.body

        const existUser = await userModel.findOne({ email })

        if (!existUser) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'User Not Exists'
            })
        }

        const secretPass = await bcrypt.hash(password, 10);


        existUser.password = secretPass;

        await existUser.save();


        return res.status(200).json({
            success: true,
            data: existUser,
            message: 'User Password Change Successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: [],
            message: 'Internal server error' + error.message
        })
    }


}

module.exports = {
    register,
    userVerify,
    login,
    GenerateToken,
    generateToken,
    LogOut,
    checkAuth,
    forgetPassword,
    resetPassword
}