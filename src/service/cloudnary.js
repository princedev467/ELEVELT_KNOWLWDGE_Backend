const cloudinary = require('cloudinary').v2;


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const updateCloudanrt = async (file, folder) => {
    try {
        const uploadResult = await cloudinary.uploader
            .upload(
                file, {
               
                folder: folder
            }
            )
            .catch((error) => {
                console.log(error);
            });

        console.log("uploadResult:", uploadResult);

        return {
            public_id: uploadResult.public_id,
            url: uploadResult.url
        }

    } catch (error) {

    }
}

const videoUpload=async(file,folder)=>{
     const uploadResult = await cloudinary.uploader   
    .upload(
                file, {
               folder: folder,
               resource_type:'video'
            }
            )
            .catch((error) => {
                console.log(error);
            });

              console.log("video_uploadResult:", uploadResult);

        return {
            public_id: uploadResult.public_id,
            url: uploadResult.url
        }

      
}

const deleteCloudanrt = async (public_id) => {


    cloudinary.uploader.destroy(public_id, function (error, result) {


        if (error) {
            console.log('Error deleting image:', error);
        } else {
            console.log('Image deleted successfully:', result);
        }
    });

}

module.exports = {
    updateCloudanrt,
    deleteCloudanrt,
    videoUpload
}