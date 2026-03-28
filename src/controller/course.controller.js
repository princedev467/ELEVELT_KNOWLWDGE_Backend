const coursesModel = require("../model/course.model");
const fs = require('fs');
const { updateCloudanrt } = require("../service/cloudnary");


const getCourses = async (req, res) => {
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
      console.log(req.body);

      try {

            console.log(req.body);
  
            // const obj = await updateCloudanrt(req.file.path, "Course_img");

            const course = await coursesModel.create({ ...req.body, course_img: { 'public_id': obj.public_id, 'url': obj.url } });

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
      try {
            let updateData = { ...req.body }

            const categoryData = await coursesModel.findById(req.params.id)

            console.log("req.file", req.file);
            console.log("categoryData", categoryData);



            if (req.file) {
                  fs.unlink(categoryData.course_img, (error) => {
                        console.log("Image Not Delete And update", error);
                  })

                  updateData.course_img = req.file.path
            }



            console.log("updateData", updateData);


            const course = await coursesModel.findByIdAndUpdate(
                  req.params.id,
                  updateData,
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
      try {
            const course = await coursesModel.findByIdAndDelete(req.params.id);
            console.log(course);

            if (course.course_img) {
                  // const img_path = path.join(__dirname,"../public/image",course.course_img);
                  const image_path = course.course_img;
                  console.log(image_path)


                  fs.unlink(image_path, (err) => {
                        if (err) {
                              console.log('failed to delete image ', err);

                        }

                  })

            }



            if (!course) {

                  return res.status(404).json({ data: null, message: 'Course not deleted' });
            }


            return res.status(200).json({ data: course, meassage: 'course delete data successful' })

      } catch (error) {
            return res.status(400).json({ data: null, meassage: 'Internal Server error in delete course' + error })

      }

}

const activeCourses = async (req, res) => {
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

