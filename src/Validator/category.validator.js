const Joi = require("joi");

const categorySchema=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().min(3).max(100).required(),
});

const addCategory = {
    body:Joi.object().keys({
      name:Joi.string().required().trim(),
      description:Joi.string().required(),
      parent_category_id:Joi.string().optional(),
      category_img:Joi.any().optional()

  })
};
const updateCategory ={
    params:Joi.object().keys({
        id:Joi.string().required().min(24),
     }),
 body:Joi.object().keys({
      name:Joi.string().required().trim(),
      description:Joi.string().required(),
      parent_category_id:Joi.string().optional(),
      category_img:Joi.any().optional()

  })
};
const deleteCategory ={
params:Joi.object().keys({
        id:Joi.string().required().min(24),
     })
};

module.exports={
    categorySchema,
    addCategory,
    updateCategory,
    deleteCategory
};
