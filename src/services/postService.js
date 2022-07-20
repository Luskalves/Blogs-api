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
    const blogPost = await model.BlogPost.findAll({
      include: [
        {
          model: model.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: model.Category,
          as: 'categories',
          attributes: { exclude: ['PostCategory'] },
        },
      ],
    });

    const category = await model.Category.findAll(); 

    return [blogPost, category];
  },

  async getById(id) {
    const postId = await model.BlogPost.findOne({
      where: { id },
      include: [
        {
          model: model.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: model.Category,
          as: 'categories',
          attributes: { exclude: ['PostCategory'] },
        },
      ],
    });
    console.log(postId);
    if (!postId) handleError('Post does not exist', '404');

    return postId;
  },

  async newPost(body, token) {
    const { error } = schema.validate(body);
    if (error) handleError(error.message, 'invalid'); 
    
    const { email } = jwt.decode(token);
    const { id } = await model.User.findOne({ where: { email } });
    const { title, content } = body;

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