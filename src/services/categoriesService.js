const Joi = require('joi');
const handleError = require('../errors/handleError');
const { Category } = require('../database/models');

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '"name" is required',
  }),
});

const categoriesService = {
  async getAll() {
    const allCategories = Category.findAll();
    return allCategories;
  },
  
  async newCategory(name) {
    const { error } = schema.validate({ name });
    if (error) handleError(error.message, 'invalid');

    await Category.create({ name });
    const newCategory = Category.findOne({ where: { name } });
    return newCategory;
  },
};

module.exports = categoriesService;