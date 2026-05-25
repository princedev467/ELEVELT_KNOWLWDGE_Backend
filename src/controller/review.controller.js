const reviewModel = require('../model/review.model');




const getAllReview = async (req, res) => {
    console.log('terms Routes');
    try {
        const review=await reviewModel.find()

        console.log(review);

        res.status(200).json({ sucess: true, data: review, message: 'get sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll review error' + error.message })
    }

}

const addReview = async (req, res) => {
    try {
        console.log("req.body", req.body);

          const review=await reviewModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "review added successfully",
            data: review
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add review error' + error.message
        });
    }
};

const updateReview = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const reviewData = await reviewModel.findByIdAndUpdate(
            req.params.id,
            req.body,         
            { new: true }        
        );

        
            if (!reviewData) {

                  return res.status(404).json({ data: null, message: 'review not updated' });
            }

        res.status(200).json({
            success: true,
            message: "review update successfully",
            data: reviewData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update review error ' + error.message
        });
    }
}

const deleteReview = async (req, res) => {
    try {
        console.log("id:", req.params.id);

        
const reviewData= await reviewModel.findByIdAndDelete(req.params.id)
     
  if (!reviewData) {

                  return res.status(404).json({ data: null, message: 'review not deleted' });
            }
res.status(200).json({  
            success: true,
            message: "review delete successfully",
            data:null
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'delete review  Internal Server Error ' + error.message
        });
    }

}


module.exports = {
   getAllReview,
   addReview,
   updateReview,
   deleteReview
}

