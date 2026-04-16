const { default: mongoose } = require("mongoose");

const quizSchema = new mongoose.Schema(
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

const quizModel = mongoose.model('quizs', quizSchema);
module.exports = quizModel  