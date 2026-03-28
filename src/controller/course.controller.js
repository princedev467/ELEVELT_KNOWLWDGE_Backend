const coursesModel = require("../model/course.model");
const fs = require('fs');
const { updateCloudanrt, deleteCloudanrt } = require("../service/cloudnary");


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
            console.log('req.file',req.file);
            
  
            const obj = await updateCloudanrt(req.file.path, "Course_img");

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
           
            const courseData = await coursesModel.findById(req.params.id)

            console.log("req.file", req.file);
            console.log("courseData", courseData);


 let updatedata = { ...req.body, course_img: { public_id: courseData.course_img.public_id, url: courseData.course_img.url } };

    console.log(updatedata);
            if (req.file) {
                
      await deleteCloudanrt(courseData?.course_img?.public_id);

      const obj = await updateCloudanrt(req.file.path, "course_img");

      updatedata.course_img = { public_id: obj.public_id, url: obj.url }
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

