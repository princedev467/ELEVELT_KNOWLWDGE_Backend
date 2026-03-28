const { default: mongoose } = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'categories',
            
        },
        name: {
            type: String,
            unique: true,
            trim: true
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        week: {
            type: Number
        },
        course_img: {
             public_id: {   
                type: String,
            },
            url: {
                type: String,
            }
        },
        preview_url: {
            type: String
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

const coursesModel = mongoose.model('courses', courseSchema);
module.exports = coursesModel  