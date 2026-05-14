const { default: mongoose } = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        orderId:{
            type:String
        },
        paymentId:{
            type:String
        },

        transactionId: {
            type: String
        },
        amount: {
            type: Number
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