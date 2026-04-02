const Joi = require("joi");

const categorySchema=Joi.object({
    name:joi.string().required(),
    description:joi.string().min(3).max(100).required(),
});

module.exports={categorySchema}
