const categorysModel = require("../model/categoryes.model");
const fs = require('fs');
const { updateCloudanrt, deleteCloudanrt } = require("../service/cloudnary");


const getAllCategories = async (req, res) => {

  try {
    const category = await categorysModel.find();
    
    if (!category) {
      return res.status(400).json({ data: null, meassage: 'category not added' })

    }


    return res.status(200).json({ data: category, meassage: 'category getAll data successful' })
  } catch (error) {
    return res.status(400).json({ data: null, meassage: 'Internal Server error in getAll category' + error })
  }

}

const getCategories = async (req, res) => {
  try {

    console.log(req.params.id);

    const category = await categorysModel.findById(req.params.id);
    if (!category) {
      return res.status(400).json({ data: null, meassage: 'category not get' })

    }


    return res.status(200).json({ data: category, meassage: 'category get data successful' })
  } catch (error) {
    return res.status(500).json({ data: null, meassage: 'Internal Server error in get category' + error })

  }

}

const addCategories = async (req, res) => {
  try {
    console.log("req.body:", req.body, req.file);

    console.log("req.user:",req.user);
    
   const obj= await updateCloudanrt(req.file.path,"category_img");

    const category = await categorysModel.create({ ...req.body, category_img: {'public_id':obj.public_id,'url':obj.url} });

    console.log('category:', category);

    if (!category) {
      return res.status(400).json({ data: null, meassage: 'category not added' })
    }

    return res.status(200).json({ data: category, meassage: 'category  added successfully' })
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ data: null, meassage: 'category not added' + error.message })
  }

}

const updateCategories = async (req, res) => {

  try {
    const categoryData = await categorysModel.findById(req.params.id);

    console.log("req.file:", req.file);

    let updatedata = { ...req.body };

    console.log(updatedata);


    if (req.file) {
      fs.unlink(categoryData.category_img, (err) => {
        console.log(err);

      })

      updatedata.category_img = req.file.path
    }


    const category = await categorysModel.findByIdAndUpdate(
      req.params.id,
      updatedata,
      { new: true, runValidators: true, upsert: true }
    );
    if (!category) {
      return res.status(400).json({ data: null, meassage: 'category not update' })

    }
    return res.status(200).json({ data: category, meassage: 'category active data successful' })

  } catch (error) {
    return res.status(500).json({ data: null, meassage: 'Internal Server error in active category' + error })

  }
}

const deleteCategories = async (req, res) => {
  try {

    console.log("req.params.id",req.params.id)
    const categoryData = await categorysModel.findById(req.params.id);
    console.log(categoryData.public_id);
    

    const category = await categorysModel.findByIdAndDelete(req.params.id);

    // await deleteCloudanrt(categoryData.public_id);


    console.log('category:-', category)
    if (!category) {
      return res.status(400).json({ data: null, meassage: 'category not delete' })

    }


    // fs.unlink(category.category_img, (err) => {
    //   console.log(err);

    // })



    return res.status(200).json({ data: category, meassage: 'category delete data successful' })
  } catch (error) {
    return res.status(500).json({ data: [], meassage: 'Internal Server error in delete category' + error })

  }

}

const activeCategories = async (req, res) => {

  try {
    const category = await categorysModel.aggregate([
      {
        $match: {
          isActive: true
        }
      },
      {
        $count: 'noof Active category'
      }
    ])

    console.log("category:",category)
    if (!category) {
      return res.status(400).json({ data: null, meassage: 'category not update' })

    }
    return res.status(200).json({ data: category, meassage: 'category update data successful' })

  } catch (error) {
    return res.status(500).json({ data: null, meassage: 'Internal Server error in update category' + error })

  }



}

module.exports = {
  addCategories,
  getAllCategories,
  getCategories,
  updateCategories,
  deleteCategories,
  activeCategories
}