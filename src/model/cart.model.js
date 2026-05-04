const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
        items: [{
            course: {
                type: mongoose.Types.ObjectId,
                ref: 'course',
            },
            price: {
                type: String,
            }
        }],
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

const cartModel = mongoose.model('carts', cartSchema);
module.exports = cartModel  