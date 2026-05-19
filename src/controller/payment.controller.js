const razorpay = require("../config/razorpay");
const enrollModel = require("../model/enrollment.model");
const PaymentModel = require("../Model/Payment.model");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const generateEnrollmentNo = require("../service/EnrollmentNo");


const getAllPayment = async (req, res) => {

    try {
        const Payment = await PaymentModel.find()

        console.log(Payment);

        res.status(200).json({ sucess: true, data: Payment, message: 'get Payment sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll Payment error' + error.message })
    }

}


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

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const isValidSignature = validateWebhookSignature(
            body,
            razorpay_signature,
            secret
        );

        if (!isValidSignature) {
            return res.status(400).json({
                success: false,
                message: "payment verification fail"
            });
        }

        // update payment
        let paymentData = await PaymentModel.findOneAndUpdate(
            { orderId: razorpay_order_id },
            {
                paymentId: razorpay_payment_id,
                signature: razorpay_signature,
                status: "completed"
            },
            { new: true }
        );

        if (!paymentData) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        let enrollments = [];

        const courseIds =[]
        console.log(courseIds);


            for (const v of paymentData.purchased_courses) {
                  courseIds.push({course_id: v.course});
                    }

            console.log(courseIds);
            

            const existingEnrollment = await enrollModel.findOne({
                user_id: paymentData.user_id,
                course_id: courseIds
            });

            if (!existingEnrollment) {

                const enrollmentNo = await generateEnrollmentNo();

                const enrollment = await enrollModel.create({
                    user_id: paymentData.user_id,
                    course: courseIds,
                    paymentId: razorpay_payment_id,
                    enrollment_no: enrollmentNo,
                    payment_status: "completed"
                });

                console.log("enrollments",enrollments);
                
            }
        

        return res.status(200).json({
            success: true,
            data: paymentData,
            message: "Payment verified "
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error: " + error.message
        });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
    getAllPayment
}