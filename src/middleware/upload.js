const multer = require("multer")
const path= require('path');
const fs=require('fs')

const storage = multer.diskStorage({
    
  destination: function (req, file, cb) {
    console.log("multer_file:",file);
    
   const filePath=  path.join('public','image',file.fieldname)

    // fs.mkdir(filePath,{recursive:true},(err)=>{
    //         console.log(err)
    // })
    // cb(null, filePath);
    cb(null, '/tmp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + '-' + file.originalname )
  }
})

const upload = multer({ storage: storage })

module.exports=upload;