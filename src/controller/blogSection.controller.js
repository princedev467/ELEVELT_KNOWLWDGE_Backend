const { Message } = require("twilio/lib/twiml/MessagingResponse");
const { videoUpload } = require("../service/cloudnary");
const BlogSectionModel = require("../model/blogSection.model");

const getAllblogSection = async (req, res) => {
  try {
    const blog = await BlogSectionModel.find().populate('blog');

    if (!blog) {
      res.status(400).json({
        success: false,
        data: null,
        message: 'blogSection  Data is not fount'
      })
    }

    res.status(200).json({ success: true, data: blog, message: 'blog Section  data getAll' })
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'internal server errror in getAll blogSection' + error.message })

  }

}




const addblogSection = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log('51_course_control_req.file', req.files);

    const ImageData = req.files

    let uploadedImages = [];

    for (const file of ImageData) {

      const obj = await videoUpload(file, "blogSection");

      uploadedImages.push({
        public_id: obj.public_id,
        url: obj.url,
        resource_type: obj.resource_type
      });
    }

    const blogSection = await BlogSectionModel.create({ ...req.body, image: uploadedImages })
    console.log('blogSection', blogSection);

    res.status(200).json({
      success: true,
      message: "blogSection added successfully",
      data: blogSection
    });



  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'add blogSection error' + error.message
    });
  }
};
const updateblogSection = async (req, res) => {
  try {

    const blogSectionData = await BlogSectionModel.findById(req.params.id);

    if (!blogSectionData) {
      return res.status(404).json({
        data: null,
        message: "blogSection not found"
      });
    }

    let updatedata = { ...req.body };

    if (req.files?.length > 0) {

      // delete old files
      if (blogSectionData?.content?.length > 0) {

        for (const file of blogSectionData.image) {
          await deleteVideo(file.public_id, file.resource_type);
        }

      }

      // upload new files
      let uploadedFiles = [];

      for (const file of req.files) {

        const obj = await videoUpload(file, "blogSection");

        uploadedFiles.push({
          public_id: obj.public_id,
          url: obj.secure_url,
          resource_type: obj.resource_type
        });

      }

      updatedata.image = uploadedFiles;

    } else {

      updatedata.image = blogSectionData.image;

    }

    const blogSection = await BlogSectionModel.findByIdAndUpdate(
      req.params.id,
      updatedata,
      { new: true, runValidators: true }
    ).populate('blog');

    return res.status(200).json({
      data: blogSection,
      message: "blogSection updated successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      data: null,
      message: "Internal Server Error in blogSection",
      error: error.message
    });

  }
}

const deleteblogSection = async (req, res) => {
  try {
    console.log("id:", req.params.id);


    const blogData = await BlogSectionModel.findByIdAndDelete(req.params.id)

    if (!blogData) {

      return res.status(404).json({ data: null, message: 'blog not deleted' });
    }
    res.status(200).json({
      success: true,
      message: "blogSection delete successfully",
      data: null
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'delete blogSection  Internal Server Error ' + error.message
    });
  }

}


module.exports = {
 getAllblogSection,
 addblogSection,
 updateblogSection,
 deleteblogSection
}
