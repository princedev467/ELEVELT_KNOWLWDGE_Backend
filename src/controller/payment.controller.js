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
module.exports = {
    deletePayment,
    upadatePayment,
    addPayment,
    getPayment,
    getAllPayment
}