const { default: mongoose } = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        cartId: {
            type: mongoose.Types.ObjectId,
            ref: 'cart'
        },
        transactionId: {
            type: String
        },
        amount: {
            type: String
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const PaymentModel = mongoose.model("payment", PaymentSchema)
module.exports = PaymentModel