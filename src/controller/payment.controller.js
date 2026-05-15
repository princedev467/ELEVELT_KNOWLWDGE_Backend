const razorpay = require("../config/razorpay");
const PaymentModel = require("../Model/Payment.model");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const createOrder = async (req, res) => {
    try {

        const { amount } = req.body;

       


        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };


        const order = await razorpay.orders.create(options);

        const payment = await PaymentModel.create({
            orderId: order.id,
            amount: order.amount,
            status: 'pending',
            user_id: req.body.user_id,
            cart_id: req.body.cart_id,
            purchased_courses: req.body.purchased_courses
        });

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


const verifyPayment = async (req, res) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const secret = process.env.RAZORPAY_KEY_SECRET

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);



        if (!isValidSignature) {
            res.status(400).json({
                success: false,
                data: null,
                message: "payment verification fail"
            })
        }

        let paymentData = await PaymentModel.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { paymentId: razorpay_payment_id, signature: razorpay_signature, status: 'completed' }
        );

        res.status(200).json({
            success: true,
            data: paymentData,
            message: "payment verification Successfull"
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            data: null,
            message: "Internal Server Error in verify Payment" + error.message
        })
    }
}
module.exports = {
    createOrder,
    verifyPayment
}