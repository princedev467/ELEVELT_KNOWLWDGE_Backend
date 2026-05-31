const { default: mongoose } = require("mongoose");

const blogsectionSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Types.ObjectId,
        ref: 'blog',
        required: true,
    },
    heading:
    {
        type: String

    },
    title:
    {
        type: String

    },
    description:
    {
        type: String

    },
    image: 
    [{
        public_id: String,
        url: String,
    }],
    order: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true,
        versionKey: false
    });

const BlogSectionModel=mongoose.model('blogsection',blogsectionSchema);
module.exports=BlogSectionModel