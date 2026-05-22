const ProgressModel = require('../model/progress.model');



const getProgress = async (req, res) => {


}

const getAllProgress = async (req, res) => {
    console.log('terms Routes');
    try {
        const progress=await ProgressModel.find()

        console.log(progress);

        res.status(200).json({ sucess: true, data: progress, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll progress error' + error.message })
    }

}

const addProgress = async (req, res) => {
    try {
        console.log("req.body", req.body);

          const progress=await ProgressModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "progress added successfully",
            data: progress
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add progress error' + error.message
        });
    }
};

const updateProgress= async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const sectionData = await ProgressModel.findByIdAndUpdate(
            req.params.id,
            req.body,         
            { new: true }        
        );

        
            if (!sectionData) {

                  return res.status(404).json({ data: null, message: 'progress not updated' });
            }

        res.status(200).json({
            success: true,
            message: "progress update successfully",
            data: sectionData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update progress error ' + error.message
        });
    }
}

const deleteProgress = async (req, res) => {
    try {
        console.log("id:", req.params.id);

        
const sectionData= await ProgressModel.findByIdAndDelete(req.params.id)
     
  if (!sectionData) {

                  return res.status(404).json({ data: null, message: 'progress not deleted' });
            }
res.status(200).json({  
            success: true,
            message: "progress delete successfully",
            data:null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete Progress  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
   getAllProgress,
   getProgress,
   addProgress,
   updateProgress,
   deleteProgress
}

