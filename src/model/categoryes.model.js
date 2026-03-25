const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true
        },
        description: {
            type: String
        },
        category_img: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }

        },
        parent_category_id: { 
            type: mongoose.Types.ObjectId,
            ref: 'categories', 
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const categorysModel = mongoose.model('categories', categorySchema);

module.exports = categorysModel