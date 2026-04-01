const userModel = require("../model/users.model")
const jwt = require("jsonwebtoken");


const authentication = (roles) =>async (req, res, next) => {

    try {
        //   console.log(roles,req.cookies);
        //   console.log(req.header('Authorization'));

        const Token = await req.cookies.accessToken || req.header('Authorization')?.replace("Bearer ", "")

        console.log("Token:-",Token);

        const decode =  jwt.verify(Token, process.env.ACCESSTOKEN_SECRET)

        console.log("decode", decode);

        const user = await userModel.findById(decode._id)

        //   console.log("user:",user); //check user

        if (!user) {
            return res.status(404).json({
                sucess: false,
                data: [],
                message: "user not found"
            })


        }
          req.user = user;

        // if (!roles.includes(user.role)) {
        //     return res.status(400).json({
        //         sucess: false,
        //         data: [],
        //         message: "you have not access"
        //     })
        // }

      
        next();

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error' + error.message
        })
    }
}

module.exports = {
    authentication
}