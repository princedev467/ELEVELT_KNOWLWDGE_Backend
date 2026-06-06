const { default: mongoose } = require("mongoose");

const blogCommentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',

    },
    comment: {
        type: String,
        trim: true,
    },
},
    {
        timestamps: true,
    }
);

const blogCommentModel = mongoose.model('blogComment', blogCommentSchema);
module.exports = blogCommentModel