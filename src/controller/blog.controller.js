const { Message } = require("twilio/lib/twiml/MessagingResponse");
const blogModel = require("../model/blog.model");
const { videoUpload } = require("../service/cloudnary");
const BlogSectionModel = require("../model/blogSection.model");

const getAllblog = async (req, res) => {
  try {
    const blog = await blogModel.find().populate('instructor', 'name email').populate('tag');

    if (!blog) {
      res.status(400).json({
        success: false,
        data: null,
        message: 'blog Data is not fount'
      })
    }

    res.status(200).json({ success: true, data: blog, message: 'blog data getAll' })
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'internal server errror in getAll blog' + error.message })

  }

}


const addblog = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log('51_course_control_req.file', req.files);

    const ImageData = req.files

    let uploadedImages = [];

    for (const file of ImageData) {

      const obj = await videoUpload(file, "content");

      uploadedImages.push({
        public_id: obj.public_id,
        url: obj.url,
        resource_type: obj.resource_type
      });
    }

    const blog = await blogModel.create({ ...req.body, content: uploadedImages })

    res.status(200).json({
      success: true,
      message: "blog added successfully",
      data: blog
    });



  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'add blog error' + error.message
    });
  }
};


const updateblog = async (req, res) => {
  try {

    const blogData = await blogModel.findById(req.params.id);

    if (!blogData) {
      return res.status(404).json({
        data: null,
        message: "Content not found"
      });
    }

    let updatedata = { ...req.body };

    if (req.files?.length > 0) {

      // delete old files
      if (blogData?.content?.length > 0) {

        for (const file of blogData.content) {
          await deleteVideo(file.public_id, file.resource_type);
        }

      }

      // upload new files
      let uploadedFiles = [];

      for (const file of req.files) {

        const obj = await videoUpload(file, "content");

        uploadedFiles.push({
          public_id: obj.public_id,
          url: obj.secure_url,
          resource_type: obj.resource_type
        });

      }

      updatedata.content = uploadedFiles;

    } else {

      updatedata.content = blogData.content;

    }

    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      updatedata,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      data: blog,
      message: "blog updated successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      data: null,
      message: "Internal Server Error",
      error: error.message
    });

  }
}

const deleteblog = async (req, res) => {
  try {
    console.log("id:", req.params.id);


    const blogData = await blogModel.findByIdAndDelete(req.params.id)

    if (!blogData) {

      return res.status(404).json({ data: null, message: 'blog not deleted' });
    }
    res.status(200).json({
      success: true,
      message: "blog delete successfully",
      data: null
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'delete blog  Internal Server Error ' + error.message
    });
  }

}

const viewBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },  // increment by 1
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ success: true, views: blog.views });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getAllblog,
  addblog,
  updateblog,
  deleteblog,
  viewBlog
}
