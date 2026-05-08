const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        discount: {
            type: String
        },
        minOrderAmount: {
            type: Number,
        },
        startDate: {
            type: Date,

        },
        expiryDate: {
            type: Date,

        },
        useLimit: {
            type: Number,
            default: 1,
        },
        isActive: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const couponModel= mongoose.model("coupons",couponSchema)
module.exports=couponModel