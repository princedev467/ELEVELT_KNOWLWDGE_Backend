const Joi = require("joi");

const categorySchema=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().min(3).max(100).required(),
});

module.exports=categorySchema;
