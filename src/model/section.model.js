const { default: mongoose } = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        Course_id: {
            type: mongoose.Types.ObjectId,
            ref: 'course',

        },
        name: {
            type: String,
            unique: true,
            trim: true
        },
        description: {
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

const secrionsModel = mongoose.model('sections', sectionSchema);
module.exports = secrionsModel  