const { default: mongoose } = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: String
        },
        paymentId: {
            type: String
        },

        transactionId: {
            type: String
        },
        cart_id: {
            type: mongoose.Types.ObjectId,
            ref: 'cart',
        },
        purchased_courses: [
            {
                course: {
                    type: mongoose.Types.ObjectId,
                    ref: 'course'
                },

                price:{
                    type:String
                }
            }
        ],
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        amount: {
            type: Number
        },
        signature: {
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