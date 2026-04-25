const { default: mongoose } = require("mongoose");

const contentSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Types.ObjectId,
            ref: 'course',

        },
        section: {
            type: mongoose.Types.ObjectId,
            ref: 'section',

        },
        name: {
            type: String,
            // unique: true,
            trim: true
        },
        contentFile:[{
             public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }],
        pdf:{
            type:String,
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

const contentModel = mongoose.model('contents', contentSchema);
module.exports = contentModel  