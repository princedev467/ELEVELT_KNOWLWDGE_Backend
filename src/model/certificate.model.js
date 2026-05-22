const { default: mongoose } = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {

        course_id: {
            type: mongoose.Types.ObjectId,
            ref: 'course',

        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },

        issue_date: {
            type: Date,
            default: Date.now
        },

       

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const certificateModel = mongoose.model('certificate', certificateSchema);
module.exports = certificateModel  