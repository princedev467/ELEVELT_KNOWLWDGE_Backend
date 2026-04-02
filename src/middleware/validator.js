const Joi = require("joi");

const pick=(reqObj,shemaKeys)=>{

 return  shemaKeys.reduce((obj,k)=>{
        if(reqObj && reqObj.hasOwnProperty(k)){
            obj[k]=reqObj[k];
        }
      return obj;  
    },{})
    

}

const validate=(Schema)=>(req,res,next)=>{

     try {
        const obj=pick(req,Object.keys(Schema))

        console.log(obj);

        const {error,value}= Joi.compile(Schema).prefs({abortEarly:false}).validate(obj)
        

        console.log(error);

       
        if(error){
                 let errMes=error.details.map((v)=>v.message).join(" ,");

            return res.status(400).json({
                success:false,
                 data: null,
                  message:'validation Error Messsage'+ errMes 
                });
      
        }

        Object.assign(req,value)
        
        next();
     } catch (error) {
        
     }
}
module.exports=validate;