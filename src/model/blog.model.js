const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({

    instructor: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },
    content: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }],
    text: {
        type: String
    },
    title: {
        type: String
    },

    subtitle: {
        type: String
    },
    tag: {
        type: mongoose.Types.ObjectId,
        ref: 'tag',
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel