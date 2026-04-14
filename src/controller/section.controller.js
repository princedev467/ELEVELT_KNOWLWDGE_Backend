const secrionsModel = require('../model/section.model');


const getSection = async (req, res) => {


}

const getAllSection = async (req, res) => {
    console.log('terms Routes');
    try {
        const section=await secrionsModel.find()

        console.log(section);

        res.status(200).json({ sucess: true, data: section, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll section error' + error.message })
    }

}

const addSection = async (req, res) => {
    try {
        console.log("req.body", req.body);

          const section=await secrionsModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "section added successfully",
            data: section
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add section error' + error.message
        });
    }
};

const updateSection = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const sectionData = await secrionsModel.findByIdAndUpdate(
            req.params.id,
            req.body,         
            { new: true }        
        );

        
            if (!sectionData) {

                  return res.status(404).json({ data: null, message: 'section not updated' });
            }

        res.status(200).json({
            success: true,
            message: "section update successfully",
            data: sectionData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update section error ' + error.message
        });
    }
}

const deleteSection = async (req, res) => {
    try {
        console.log("id:", req.params.id);

        
const sectionData= await secrionsModel.findByIdAndDelete(req.params.id)
     
  if (!sectionData) {

                  return res.status(404).json({ data: null, message: 'section not deleted' });
            }
res.status(200).json({  
            success: true,
            message: "section delete successfully",
            data:null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete Section  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
    getAllSection,
    getSection,
    addSection,
    updateSection,
    deleteSection
}

