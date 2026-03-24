const  cloudinary=require('cloudinary').v2;


  // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    const updateCloudanrt=async(file,folder)=>{
        try {
            const uploadResult = await cloudinary.uploader
       .upload(
           file, {
               public_id: 'shoes',
               folder:folder
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
        } catch (error) {
            
        }
    }
    const deleteCloudanrt=()=>{

    }

    module.exports={
        updateCloudanrt,
        deleteCloudanrt
    }