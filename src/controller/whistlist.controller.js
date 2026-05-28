const { Message } = require("twilio/lib/twiml/MessagingResponse");
const whistlistModel = require("../model/whistlist.model")

const getAllwhistlist = async (req, res) => {
    try {
        const whistlist = await whistlistModel.find();

        if (!whistlist) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'whistlist Data is not fount'
            })
        }

        res.status(200).json({ success: true, data: whistlist, message: 'whistlist data getAll' })
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'internal server errror in getAll whistlist' + error.message })

    }

}


const addWhistlist = async (req, res) => {
    try {
        console.log("req.body", req.body);

        const whistlist = await whistlistModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "whistlist added successfully",
            data: whistlist
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add whistlist error' + error.message
        });
    }
};

const updateWhistlist = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const whistlistData = await whistlistModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        if (!whistlistData) {

            return res.status(404).json({ data: null, message: 'whistlist not updated' });
        }

        res.status(200).json({
            success: true,
            message: "whistlist update successfully",
            data: whistlistData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update whistlist error ' + error.message
        });
    }
}

const deleteWhistlist = async (req, res) => {
    try {
        console.log("id:", req.params.id);


        const whistlistData = await whistlistModel.findByIdAndDelete(req.params.id)

        if (!whistlistData) {

            return res.status(404).json({ data: null, message: 'whistlist not deleted' });
        }
        res.status(200).json({
            success: true,
            message: "whistlist delete successfully",
            data: null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete whistlist  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
  getAllwhistlist,
  addWhistlist,
  updateWhistlist,
  deleteWhistlist
}
