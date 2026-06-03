const { default: mongoose } = require("mongoose");

const blogLikeSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Types.ObjectId,
        ref: 'blog',
    },
    user:[{
        type: mongoose.Types.ObjectId,
        ref: 'users',
    }],
    likes:{
        type:Number,
        default:0
    }

},
    {
        timestamps: true,
        versionKey: false
    }
);

const blogLikesModel = mongoose.model('blogLikes', blogLikeSchema);
module.exports = blogLikesModel