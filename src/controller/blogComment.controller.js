const blogCommentModel = require('../model/blogComment.model');



const getAllBlogComment = async (req, res) => {
    console.log('terms Routes');
    try {
        const blogComment = await blogCommentModel.find().populate('user', 'name email')

        console.log(blogComment);

        res.status(200).json({ sucess: true, data: blogComment, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll blogComment error' + error.message })
    }

}

const addBlogComment = async (req, res) => {
    try {
        console.log("req.body", req.body);

        const blogComment = await blogCommentModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "blogComment added successfully",
            data: blogComment
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add blogComment error' + error.message
        });
    }
};

const updateBlogComment = async (req, res) => {
    try {
        

        const blogCommentData = await blogCommentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!blogCommentData) {
            return res.status(404).json({
                success: false,
                message: "blogComment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "blogComment updated successfully",
            data: blogCommentData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteBlogComment = async (req, res) => {
    try {
        console.log("id:", req.params.id);


        const blogCommentData = await blogCommentModel.findByIdAndDelete(req.params.id)

        if (!blogCommentData) {

            return res.status(404).json({ data: null, message: 'blogComment not deleted' });
        }
        res.status(200).json({
            success: true,
            message: "blogComment delete successfully",
            data: null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete BlogComment  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
    getAllBlogComment,
    addBlogComment,
    updateBlogComment,
    deleteBlogComment
}

