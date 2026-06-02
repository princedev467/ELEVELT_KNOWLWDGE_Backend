const tagModel = require('../model/tag.model');




const getAllTag = async (req, res) => {
    console.log('terms Routes');
    try {
        const tag=await tagModel.find()

        console.log(tag);

        res.status(200).json({ sucess: true, data: tag, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll tag error' + error.message })
    }

}

const addTag = async (req, res) => {
    try {
        console.log("req.body", req.body);

          const tag=await tagModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "tag added successfully",
            data: tag
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add tag error' + error.message
        });
    }
};

const updateTag = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const tagData = await tagModel.findByIdAndUpdate(
            req.params.id,
            req.body,         
            { new: true }        
        );

        
            if (!tagData) {

                  return res.status(404).json({ data: null, message: 'tag not updated' });
            }

        res.status(200).json({
            success: true,
            message: "tag update successfully",
            data: tagData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update tag error ' + error.message
        });
    }
}

const deleteTag = async (req, res) => {
    try {
        console.log("id:", req.params.id);

        
const tagData= await tagModel.findByIdAndDelete(req.params.id)
     
  if (!tagData) {

                  return res.status(404).json({ data: null, message: 'tag not deleted' });
            }
res.status(200).json({  
            success: true,
            message: "tag delete successfully",
            data:null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete Tag  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
    getAllTag,
    addTag,
    updateTag,
    deleteTag
}

