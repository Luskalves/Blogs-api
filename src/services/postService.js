const Joi = require('joi');
const jwt = require('jsonwebtoken');
const model = require('../database/models');
const handleError = require('../errors/handleError');

const date = new Date();

const schema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  }),
  categoryIds: Joi.array().min(1).required().messages({
    'array.base': '"categoryIds" not found',
    'array.min': '"categoryIds" not found',
    'any.required': '"categoryIds" not found',
  }),
});

const postService = {
  async getAll() { 
    const teste = await model.PostCategories.findAll();
    const blogPost = await model.BlogPost.findAll({
      attributes: { exclude: ['UserId'] },
      include: [
        {
          model: model.User,
          as: 'user',
        },
        {
          model: model.Category,
          as: 'Categories',
        },
      ],
    });

    console.log(teste);

    const category = await model.Category.findAll(); 

    return [blogPost, category];
  },

  async newPost(body, token) {
    const { error } = schema.validate(body);
    if (error) handleError(error.message, 'invalid'); 
    
    const { email } = jwt.decode(token);
    const { id } = await model.User.findOne({ where: { email } });
    const { title, content } = body;
    console.log(email);

    await model.BlogPost.create({ title, 
      content, 
      userId: id,
      published: date,
      updated: date,
    }, { raw: true });

    const newPost = await model.BlogPost.findOne({
      where: { userId: id }, 
      order: [['id', 'desc']],
    });

    return newPost;
  },

  async validateCatgories(categories) {
    const exists = await Promise.all(categories.map((category) => model.Category
    .findOne({ where: { id: category } })));
    if (exists.some((e) => !e)) handleError('"categoryIds" not found', 'invalid'); 
  },

  async newBlogCategory(id, categories) {
    await Promise.all(categories
      .map((c) => model.PostCategory.create({ postId: id, categoryId: c })));
  },
};

module.exports = postService;