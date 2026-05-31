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
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    tag: {
        type: String
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