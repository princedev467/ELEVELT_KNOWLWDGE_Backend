const blogLikesModel = require('../model/blogLikes.model');



const getAllBlogLikes = async (req, res) => {
  console.log('terms Routes');
  try {
    const blogLike = await blogLikesModel.find()

    console.log(blogLike);

    res.status(200).json({ sucess: true, data: blogLike, message: 'get sucessfully' })

  } catch (error) {
    res.status(500).json({ sucess: false, data: [], message: 'getAll blogLike error' + error.message })
  }

}

const addBlogLikes = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const blogLike = await blogLikesModel.create(req.body)

    res.status(200).json({
      success: true,
      message: "blogLike added successfully",
      data: blogLike
    });



  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'add blogLike error' + error.message
    });
  }
};

const updateBlogLikes = async (req, res) => {
  try {
    const { user } = req.body;

    const blogLike = await blogLikesModel.findById(req.params.id);

    //if user alreay liked
    const alreadyLiked = blogLike.user.some(
      (id) => id.toString() === user
    );

    let updated;

    if (alreadyLiked) {
      //remove user and their like
      updated = await blogLikesModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { user },
          $inc: { likes: -1 },
        },
        { new: true }
      );
    } else {
      updated = await blogLikesModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { user },
          $inc: { likes: 1 },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteBlogLikes = async (req, res) => {
  try {
    console.log("id:", req.params.id);


    const blogLikeData = await blogLikesModel.findByIdAndDelete(req.params.id)

    if (!blogLikeData) {

      return res.status(404).json({ data: null, message: 'blogLike not deleted' });
    }
    res.status(200).json({
      success: true,
      message: "blogLike delete successfully",
      data: null
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'delete BlogLikes  Internal Server Error ' + error.message
    });
  }

}


module.exports = {
  getAllBlogLikes,
  addBlogLikes,
  updateBlogLikes,
  deleteBlogLikes
}

