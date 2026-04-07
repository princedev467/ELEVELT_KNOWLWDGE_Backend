const coursesModel = require("../model/course.model");
const fs = require('fs');
const { updateCloudanrt, deleteCloudanrt } = require("../service/cloudnary");


const getCourses = async (req, res) => {
      // #swagger.tags = ['course']
      try {
            const course = await coursesModel.findById(req.params.id);


            if (!course) {
                  return res.status(400).json({ data: null, meassage: 'Course not get' })
            }


            return res.status(200).json({ data: course, meassage: 'Course  get successfully' })

      } catch (error) {
            return res.status(500).json({ data: null, meassage: 'Course not get', error })

      }

}

const getAllCourses = async (req, res) => {
      // #swagger.tags = ['course']
      try {
            const course = await coursesModel.find()

            if (!course) {
                  return res.status(400).json({ data: null, meassage: 'Course not getAll' })
            }

            return res.status(200).json({ data: course, meassage: 'Course  getAll successfully' })

      } catch (error) {
            return res.status(500).json({ data: null, meassage: 'Internal Server error in getAll course' + error })

      }

}

const addCourses = async (req, res) => {
      // #swagger.tags = ['course']
      // console.log(req.body);

      try {

            console.log("req.body", req.body);
            console.log('51_course_control_req.file', req.files);
            // console.log("video",req.files.course_video);


            const ImageData = req.files

            let uploadedImages = [];

            for (const file of ImageData) {

                  const obj = await updateCloudanrt(file.path, "Course_img");

                  uploadedImages.push({
                        public_id: obj.public_id,
                        url: obj.url
                  });
            }


            console.log("uploadedImages", uploadedImages);

            const course = await coursesModel.create({ ...req.body, course_img: uploadedImages });

            console.log('course:', course);

            if (!course) {
                  return res.status(400).json({ data: null, meassage: 'Course not added' })
            }


            return res.status(200).json({ data: course, meassage: 'Course  added successfully' })

      } catch (error) {
            return res.status(400).json({ data: null, meassage: 'Course not added', error })
      }

}

const updateCourses = async (req, res) => {
      // #swagger.tags = ['course']
      try {

            const courseData = await coursesModel.findById(req.params.id)

            console.log("req.files", req.files);
            console.log("courseData", courseData);

            let updatedata = { ...req.body };

            console.log(updatedata);
            if (req.files?.length > 0) {
                  //old delete image
                  for (const imagedel of courseData.course_img) {
                        await deleteCloudanrt(imagedel.public_id);
                  }


                  const ImageData = req.files
                  let uploadedImages = [];
                  //new update image
                  for (const file of ImageData) {

                        const obj = await updateCloudanrt(file.path, "Course_img");


                        uploadedImages.push({
                              public_id: obj.public_id,
                              url: obj.url
                        });

                        updatedata.course_img = uploadedImages;
                  }


                  console.log("uploadedImages", uploadedImages);
                  
            } else {
                  updatedata.course_img = courseData.course_img;
            }

            console.log("updatedata", updatedata);

            const course = await coursesModel.findByIdAndUpdate(
                  req.params.id,
                  updatedata,
                  { new: true, runValidators: true }
            )

            console.log(course);

            if (!course) {
                  return res.status(400).json({ data: null, meassage: "Course Not update" })
            }

            return res.status(200).json({ data: course, meassage: "Course update Sucessfully" })

      } catch (error) {
            return res.status(500).json({ data: null, meassage: 'Internal Server error in active Course' + error.message })


      }

}

const deleteCourses = async (req, res) => {
      // #swagger.tags = ['course']
      try {
            const courseData = await coursesModel.findById(req.params.id);
            console.log(courseData);

            const course = await coursesModel.findByIdAndDelete(req.params.id);

            await deleteCloudanrt(courseData?.course_img?.public_id);


            if (!course) {

                  return res.status(404).json({ data: null, message: 'Course not deleted' });
            }


            return res.status(200).json({ data: course, meassage: 'course delete data successful' })

      } catch (error) {
            return res.status(400).json({ data: null, meassage: 'Internal Server error in delete course' + error })

      }

}

const activeCourses = async (req, res) => {
      // #swagger.tags = ['course']
      try {
            console.log("Active's req.body:", req.body);

            // const courseData = await coursesModel.findById(req.params.id);
            // console.log(course);

            let updateData = { ...req.body }

            // if (!courseData) {

            //       return res.status(404).json({ data: null, message: 'Course not find' });
            // }


            const course = await coursesModel.findByIdAndUpdate(
                  req.params.id,
                  updateData,
                  { new: true, runValidators: true }
            )

            console.log(course);

            return res.status(200).json({ data: course, meassage: 'course delete data successful' })

      } catch (error) {
            return res.status(400).json({ data: null, meassage: 'Internal Server error in delete course' + error })

      }

}

module.exports = {
      addCourses,
      getCourses,
      getAllCourses,
      updateCourses,
      deleteCourses,
      activeCourses
}

