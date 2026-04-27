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

const storageVideo = multer.diskStorage({
    destination: function(req, file, cb){

        console.log(file);
        
      const filePath =  path.join('public','video',file.fieldname)

    fs.mkdir(filePath,{recursive:true},(err)=>{
            console.log(err)
    })
    cb(null, filePath);

        cb(null, './public/videoUpload');
         // cb(null, '/tmp');
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
});

// file validation

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype ===  'image/png' || file.mimetype ===  'image/jpg'){
//         cb(null,true);
//     }else{
//         cb({message: 'Unsupported File Format'}, false)
//     }
// };

const fileFilterVideo = (req, file, cb) => {
    if(file.mimetype === 'video/mp4'){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};


const uploadImage = multer({
    storage

});

const uploadVideo = multer({
    storage:storageVideo
});

module.exports={uploadImage,uploadVideo};