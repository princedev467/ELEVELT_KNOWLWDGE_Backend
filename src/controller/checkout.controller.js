const checkoutModel = require('../model/checkout.model');

const getCheckout = async (req, res) => {
    console.log('terms Routes');

    try {
        const checkout = await checkoutModel.findById(req.params.id);

        console.log(checkout);

        res.status(200).json({ sucess: true, data: checkout, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll checkout error' + error.message })
    }

}

const getAllCheckout = async (req, res) => {
    console.log('terms Routes');
    try {
        const checkout = await checkoutModel.find()

        console.log(checkout);

        res.status(200).json({ sucess: true, data: checkout, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll checkout error' + error.message })
    }

}

const addCheckout = async (req, res) => {
    try {
        console.log("req.body", req.body);

        const checkout = await checkoutModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "checkout added successfully",
            data: checkout
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add checkout error' + error.message
        });
    }
};

const updateCheckout = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const checkoutData = await checkoutModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        if (!checkoutData) {

            return res.status(404).json({ data: null, message: 'coupon not updated' });
        }

        res.status(200).json({
            success: true,
            message: "checkout update successfully",
            data: checkoutData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update checkout error ' + error.message
        });
    }
}

const deleteCheckout = async (req, res) => {
    try {
        console.log("id:", req.params.id);


        const checkoutData = await checkoutModel.findByIdAndDelete(req.params.id)

        if (!checkoutData) {

            return res.status(404).json({ data: null, message: 'checkout not deleted' });
        }
        res.status(200).json({
            success: true,
            message: "checkout delete successfully",
            data: null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete checkout  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
    getAllCheckout,
    addCheckout,
    updateCheckout,
    deleteCheckout,
    getCheckout
}

