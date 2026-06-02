const { default: mongoose } = require("mongoose");

const tagSchema = new mongoose.Schema({
    tag:{
        type:String
    }
   
},
    {
        timestamps: true,
        versionKey: false
    }
);

const tagModel = mongoose.model('tag', tagSchema);
module.exports = tagModel