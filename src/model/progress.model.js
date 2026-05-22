const { default: mongoose } = require("mongoose");

const ProgressSchema = new mongoose.Schema(
    {
       
        content_Id: {
            type: mongoose.Types.ObjectId,
            ref: 'content',
        },
        enroll_Id: {
            type: mongoose.Types.ObjectId,
            ref: 'enrollment',
        },
        is_complete: {
            type: Boolean,
            default: false
        },
        duration: {
            type: String
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ProgressModel = mongoose.model("progress", ProgressSchema)
module.exports = ProgressModel