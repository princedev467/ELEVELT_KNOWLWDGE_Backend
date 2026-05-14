const PaymentModel = require("../Model/Payment.model");

const getAllPayment = async (req, res) => {
    try {
        const payment = await PaymentModel.find();

        if (!payment) {
            return res.status(400).json({ data: null, meassage: "Payment Not added" })
        }

        return res.status(200).json({ data: payment, meassage: "Payment added Sucessfully" })
    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'Internal Server error getAll payment error' + error.message })
    }
}

const getPayment = async (req, res) => {
    try {
        const payment = await PaymentModel.find()

        console.log(payment);

        res.status(200).json({ data: payment, message: 'Payment get sucessfully' })
    } catch (error) {
        console.log(error);

        res.status(500).json({ sucess: false, data: [], message: 'Internal Server error get payment error' + error.message })
    }
}

const addPayment = async (req, res) => {
    try {
        const payment = await PaymentModel.create(req.body)

        console.log("payment", payment);

        res.status(200).json({ data: payment, message: 'Payment add successfully'})
    } catch (error) {
        console.log(error);

        res.status(500).json({ sucess: false, data: [], message: 'Internal Server error add payment error' + error.message })
    }
}



const upadatePayment = async (req, res) => {
    try {

        let upadte = { ...req.body }
        const payment = await PaymentModel.findByIdAndUpdate(
            req.params.id,
            upadte,
            { new: true }
        )

        console.log(payment);

        if (!payment) {
            return res.status(400).json({ data: null, message: "Payment Not Upadted" })
        }

        res.status(200).json({ data: payment, message: 'Payment updated successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, data: [], message: 'Internal Server error update payment error' + error.message })
    }
}

const deletePayment = async (req, res) => {
    try {
        console.log("req", req.params.id);

        const payment = await PaymentModel.findByIdAndDelete(req.params.id)

        console.log(payment);

        if (!payment) {
            return res.status(400).json({ data: null, message: "Payment Not Deleted" })
        }

        res.status(200).json({ data: payment, message: 'Payment  deleted successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, data: [], message: 'Internal Server error delete payment error' + error.message })
    }
}


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
            order
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Create order failed"
        });
    }
};

const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body.toString())
            .digest("hex");

        const isAuthentic =
            expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        // SAVE PAYMENT IN DATABASE
        const payment = await PaymentModel.create({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount,
            status: "paid"
        });

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            data: payment
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Verify payment failed"
        });
    }
};
module.exports = {
    deletePayment,
    upadatePayment,
    addPayment,
    getPayment,
    getAllPayment,

     // Razorpay
    createOrder,
    verifyPayment
}