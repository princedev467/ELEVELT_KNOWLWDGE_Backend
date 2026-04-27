const fs = require('fs');
const { updateCloudanrt, deleteCloudanrt, videoUpload, deleteVideo } = require("../service/cloudnary");
const contentModel = require("../model/content.model");


const getContent = async (req, res) => {
      // #swagger.tags = ['course']
      try {
            const content = await contentModel.findById(req.params.id);


            if (!content) {
                  return res.status(400).json({ data: null, meassage: 'Content not get' })
            }


            return res.status(200).json({ data: content, meassage: 'content  get successfully' })

      } catch (error) {
            return res.status(500).json({ data: null, meassage: 'content not get', error })

      }

}

const getAllContent = async (req, res) => {
      // #swagger.tags = ['course']
      try {
            const content = await contentModel.find()

            if (!content) {
                  return res.status(400).json({ data: null, meassage: 'Content not getAll' })
            }

            return res.status(200).json({ data: content, meassage: 'Content  getAll successfully' })

      } catch (error) {
            return res.status(500).json({ data: null, meassage: 'Internal Server error in getAll Content' + error })

      }

}

const addContent = async (req, res) => {
      try {
            console.log("req.body", req.body);
             console.log('51_course_control_req.file', req.files);
           
            const ImageData = req.files

            let uploadedImages = [];

            for (const file of ImageData) {

                  const obj = await videoUpload(file.path, "contentFile");

                  uploadedImages.push({
                        public_id: obj.public_id,
                        url: obj.url
                  });
            }


            // console.log("uploadedImages", uploadedImages);

            const content = await contentModel.create({ ...req.body, contentFile: uploadedImages });

            // const content = await contentModel.create(req.body);
            console.log('content:', content);

            if (!content) {
                  return res.status(400).json({ data: null, meassage: 'Content not added' })
            }


            return res.status(200).json({ data: content, meassage: 'Content  added successfully' })

      } catch (error) {
            return res.status(400).json({ data: null, meassage: 'Content not added', error })
      }

}

const updateContent = async (req, res) => {
      try {

            const contentData = await contentModel.findById(req.params.id)

            console.log("req.files", req.files);
            console.log("contentData", contentData);

            let updatedata = { ...req.body };

            console.log(updatedata);
            if (req.files?.length > 0) {
                  //old delete image
                  for (const imagedel of contentData.contentFile) {
                        await deleteVideo(imagedel.public_id);
                  }


                  const ImageData = req.files
                  let uploadedImages = [];
                  //new update image
                  for (const file of ImageData) {

                        const obj = await videoUpload(file.path, "contentFile");


                        uploadedImages.push({
                              public_id: obj.public_id,
                              url: obj.url
                        });

                        updatedata.contentFile = uploadedImages;
                  }


                  console.log("uploadedImages", uploadedImages);

            } else {
                  updatedata.contentFile = contentData.contentFile;
            }

            console.log("updatedata", updatedata);

            const content = await contentModel.findByIdAndUpdate(
                  req.params.id,
                  updatedata,
                  { new: true, runValidators: true }
            )

            console.log(content);

            if (!content) {
                  return res.status(400).json({ data: null, meassage: "Content Not update" })
            }

            return res.status(200).json({ data: content, meassage: "Content update Sucessfully" })

      } catch (error) {
            return res.status(500).json({ data: null, meassage: 'Internal Server error in active Content' + error.message })


      }

}

const deleteContent = async (req, res) => {
      try {
            const contentData = await contentModel.findById(req.params.id);
            console.log(contentData);

            const content = await contentModel.findByIdAndDelete(req.params.id);
            
            for (const imagedel of contentData.contentFile) {
                  await deleteVideo(imagedel.public_id);
            }

            if (!content) {

                  return res.status(404).json({ data: null, message: 'Content not deleted' });
            }


            return res.status(200).json({ data: content, meassage: 'Content delete data successful' })

      } catch (error) {
            return res.status(400).json({ data: null, meassage: 'Internal Server error in delete Content' + error })

      }

}

const activeContent = async (req, res) => {
      try {
            console.log("Active's req.body:", req.body);


            let updateData = { ...req.body }

            const course = await contentModel.findByIdAndUpdate(
                  req.params.id,
                  updateData,
                  { new: true, runValidators: true }
            )

            if (!course) {

                  return res.status(404).json({ data: null, message: 'Course not Updated' });
            }

            console.log(course);

            return res.status(200).json({ data: course, meassage: 'course delete data successful' })

      } catch (error) {
            return res.status(400).json({ data: null, meassage: 'Internal Server error in delete course' + error })

      }

}

module.exports = {
      addContent,
      getContent,
      getAllContent,
      updateContent,
      deleteContent
}

