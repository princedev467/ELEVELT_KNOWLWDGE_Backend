const couponModel = require('../model/coupon.model');

const getCoupon = async (req, res) => {
    console.log('terms Routes');

    try {
        const coupon = await couponModel.findById(req.params.id);

        console.log(coupon);

        res.status(200).json({ sucess: true, data: coupon, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll coupon error' + error.message })
    }

}

const getAllCoupon = async (req, res) => {
    console.log('terms Routes');
    try {
        const coupon = await couponModel.find()

        console.log(coupon);

        res.status(200).json({ sucess: true, data: coupon, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll coupon error' + error.message })
    }

}

const addCoupon = async (req, res) => {
    try {
        console.log("req.body", req.body);

        const coupon = await couponModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "coupon added successfully",
            data: coupon
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add coupon error' + error.message
        });
    }
};

const updateCoupon = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const couponData = await couponModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        if (!couponData) {

            return res.status(404).json({ data: null, message: 'coupon not updated' });
        }

        res.status(200).json({
            success: true,
            message: "coupon update successfully",
            data: couponData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update coupon error ' + error.message
        });
    }
}

const deleteCoupon = async (req, res) => {
    try {
        console.log("id:", req.params.id);


        const couponData = await couponModel.findByIdAndDelete(req.params.id)

        if (!couponData) {

            return res.status(404).json({ data: null, message: 'coupon not deleted' });
        }
        res.status(200).json({
            success: true,
            message: "coupon delete successfully",
            data: null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete coupon  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
    getAllCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    getCoupon
}

