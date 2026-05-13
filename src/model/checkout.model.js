const { default: mongoose } = require("mongoose");

const checkoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        courseDetail: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'course',
            }
        ],
        status: {
            type: String,

        },
        totalAmount: {
            type: Number
        }


    },
    {
        timestamps: true,
        versionKey: false
    }
);

const checkoutModel = mongoose.model("order", checkoutSchema)
module.exports = checkoutModel