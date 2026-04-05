const multer = require("multer")
const path= require('path');
const fs=require('fs')

const storage = multer.diskStorage({
    
  destination: function (req, file, cb) {
    console.log("multer_file:",file);
    
   const filePath =  path.join('public','image',file.fieldname)

    fs.mkdir(filePath,{recursive:true},(err)=>{
            console.log(err)
    })
    cb(null, filePath);

    // cb(null, '/tmp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + '-' + file.originalname )
  }


})


// const videoStorage = multer.diskStorage({

//   destination: function (req, file, cb) {

//     const filePath = path.join('public', 'video',file.fieldname);

//     fs.mkdir(filePath, { recursive: true }, (err) => {
//       if (err){ console.log(err)};
//       cb(null, filePath);
//     });
//   },

//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Video filter
// const fileFilterVideo = (req, file, cb) => {
//   if (file.mimetype === "video/mp4") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only MP4 videos allowed"), false);
//   }
// };

// const uploadVideo = multer({
//   storage: videoStorage,
//   fileFilter: fileFilterVideo
// });

const upload = multer({ 
  storage
  // fileFilter: fileFilterVideo
})

module.exports=upload;