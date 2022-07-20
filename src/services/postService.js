const Joi = require('joi');
const jwt = require('jsonwebtoken');
const model = require('../database/models');
const handleError = require('../errors/handleError');

const date = new Date();
const handleErrMessage = 'Some required fields are missing';

const schema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': handleErrMessage,
    'any.required': handleErrMessage,
  }),
  content: Joi.string().required().messages({
    'string.empty': handleErrMessage,
    'any.required': handleErrMessage,
  }),
  categoryIds: Joi.array().min(1).required().messages({
    'array.base': '"categoryIds" not found',
    'array.min': '"categoryIds" not found',
    'any.required': '"categoryIds" not found',
  }),
});

const schemaPut = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': handleErrMessage,
    'any.required': handleErrMessage,
  }),
  content: Joi.string().required().messages({
    'string.empty': handleErrMessage,
    'any.required': handleErrMessage,
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

  async changePost(id, body) {
    const { error } = schemaPut.validate(body);
    if (error) handleError(error.message, 'invalid');
    await model.BlogPost.update({ title: body.title, content: body.content }, {
      where: { id },
    });

    const postChanged = await model.BlogPost.findOne({
      where: { id },
      include: [
        { model: model.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: model.Category, as: 'categories', attributes: { exclude: ['PostCategory'] } },
      ],
    });

    return postChanged;
  },

  async validateUserToken(id, token) {
    const user = await model.User.findOne({ where: { id } });
    const { email } = jwt.decode(token);
    console.log(user);
    console.log(email);

    if (user.email !== email) {
      handleError('Unauthorized user', '401');
    }

    return { id, token };
  },
};

module.exports = postService;