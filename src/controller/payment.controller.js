const razorpay = require("../config/razorpay");
const PaymentModel = require("../Model/Payment.model");

const createOrder = async (req, res) => {
    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            data: order,
            key: process.env.RAZORPAY_KEY_ID,
            message: 'create order successfull'
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            data: null,
            message: "Internal Server Error in order" + error.message
        });
    }
};


module.exports = {
    createOrder
}