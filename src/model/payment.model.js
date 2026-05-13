const { default: mongoose } = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        Cart_id: {
            type: mongoose.Types.ObjectId,
            ref: 'cart'
        },
        method: {
            type: String,
        },
        amount: {
            type: String
        },
        status: {
            type: String,

        },
        datetime: {
            type: Date,

        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const PaymentModel = mongoose.model("payment", PaymentSchema)
module.exports = PaymentModel