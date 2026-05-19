const enrollModel = require('../model/enrollment.model');
const secrionsModel = require('../model/section.model');


const getEnroll = async (req, res) => {


}

const getAllEnroll = async (req, res) => {
    console.log('terms Routes');
    try {
        const enroll=await enrollModel.find()

        console.log(enroll);

        res.status(200).json({ sucess: true, data: enroll, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll enroll error' + error.message })
    }

}

const addEnroll = async (req, res) => {
    try {
        console.log("req.body", req.body);

          const enroll=await enrollModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "enroll added successfully",
            data: enroll
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add enroll error' + error.message
        });
    }
};

const updateEnroll = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const enrollData = await enrollModel.findByIdAndUpdate(
            req.params.id,
            req.body,         
            { new: true }        
        );

        
            if (!enrollData) {

                  return res.status(404).json({ data: null, message: 'enroll not updated' });
            }

        res.status(200).json({
            success: true,
            message: "enroll update successfully",
            data: enrollData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update enroll error ' + error.message
        });
    }
}

const deleteEnroll = async (req, res) => {
    try {
        console.log("id:", req.params.id);

        
const enroll= await enrollModel.findByIdAndDelete(req.params.id)
     
  if (!enroll) {

                  return res.status(404).json({ data: null, message: 'enroll not deleted' });
            }
res.status(200).json({  
            success: true,
            message: "enroll delete successfully",
            data:null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete enroll  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
   getEnroll,
   getAllEnroll,
   addEnroll,
   updateEnroll,
   deleteEnroll
}

