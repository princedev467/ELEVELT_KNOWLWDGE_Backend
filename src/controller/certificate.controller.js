const certificateModel = require('../model/certificate.model');
const coursesModel = require('../model/course.model');
const userModel = require('../model/users.model');
const createCertificate = require('../service/certificate');
const dayjs = require("dayjs");

const generateCertificate = async (req, res) => {
  try {
    const { course, user, grade, issue_date } = req.body;

    const courseData = await coursesModel.findById(course);
    const userData = await userModel.findById(user);

    if (!courseData || !userData) {
      return res.status(404).json({
        success: false,
        message: "Course or user not found",
      });
    }

    const Certificate = await certificateModel.create({
      course,
      user,
      grade,
      issue_date,
    });

    const pdf = await createCertificate({
      username: userData.name,
      courseName: courseData.name,
      grade,
      issueDate: issue_date || dayjs().format("DD MMMM YYYY"),
    });

    console.log("PDF:", pdf);

    res.status(200).json({
      success: true,
      data: pdf,
      message: "PDF generated successfully",
    });
  } catch (error) {
    console.error("Certificate Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// const getAllSection = async (req, res) => {
//     console.log('terms Routes');
//     try {
//         const Certificate = await secrionsModel.find()

//         console.log(Certificate);

//         res.status(200).json({ sucess: true, data: Certificate, message: 'get sucessfully' })

//     } catch (error) {
//         res.status(500).json({ sucess: false, data: [], message: 'getAll Certificate error' + error.message })
//     }

// }

// const addSection = async (req, res) => {
//     try {
//         console.log("req.body", req.body);

//         const Certificate = await secrionsModel.create(req.body)

//         res.status(200).json({
//             success: true,
//             message: "Certificate added successfully",
//             data: Certificate
//         });



//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             data: [],
//             message: 'add Certificate error' + error.message
//         });
//     }
// };

// const updateSection = async (req, res) => {
//     try {
//         console.log("id:", req.params.id);
//         console.log("body:", req.body);

//         const sectionData = await secrionsModel.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );


//         if (!sectionData) {

//             return res.status(404).json({ data: null, message: 'Certificate not updated' });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Certificate update successfully",
//             data: sectionData
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             data: [],
//             message: 'update Certificate error ' + error.message
//         });
//     }
// }

// const deleteSection = async (req, res) => {
//     try {
//         console.log("id:", req.params.id);


//         const sectionData = await secrionsModel.findByIdAndDelete(req.params.id)

//         if (!sectionData) {

//             return res.status(404).json({ data: null, message: 'Certificate not deleted' });
//         }
//         res.status(200).json({
//             success: true,
//             message: "Certificate delete successfully",
//             data: null
//         });


//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             data: [],
//             message: 'delete Certificate  Internal Server Error ' + error.message
//         });
//     }

// }


module.exports = {
    // getAllSection,
    // addSection,
    // updateSection,
    // deleteSection,
    generateCertificate
}

