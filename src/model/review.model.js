const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {

        course: {
            type: mongoose.Types.ObjectId,
            ref: 'course',
        },
        user: {
           type: mongoose.Types.ObjectId,
            ref: 'users',    
        },
        rating: {
            type: Number,
            default:5
   
        },
        description:{
            type:String
        }


    },
    {
        timestamps: true,
        versionKey: false
    }
);

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel  