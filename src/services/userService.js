const Joi = require('joi');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const handleError = require('../errors/handleError');

const schema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'String.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email({ tlds: { allow: true } }).required().messages({
    'String.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'String.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const userService = {
  async getUsers() {
    const array = await User.findAll();
    const users = array.map((arr) => ({
        displayName: arr.displayName,
        email: arr.email,
        image: arr.image,
      }));
    return users; 
  },
  async newUser(user) {
    // const { displayName, email, password, image } = user;
    const { email } = user;
    const { error } = schema.validate(user);
    
    if (error) return handleError(error.message, 'invalid');
    const exists = await User.findOne({ where: { email } });

    if (exists) return handleError('User already registered', 'registred');

    await User.create({ ...user });
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return token;
  },

  async getById(id) {
    const response = await User.findOne({ where: { id } });
    if (!response) handleError('User does not exist', '404');
    const user = {
      id: Number(id),
      displayName: response.displayName,
      email: response.email,
      image: response.image,
    };
    return user;
  },

  async validateToken(token) {
    if (!token) handleError('Token not found', '401');
    const isValid = jwt.decode(token, process.env.JWT_SECRET);
    if (!isValid) handleError('Expired or invalid token', '401');
  },
};

module.exports = userService;