const Joi = require('joi');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const model = require('../database/models');
const handleError = require('../errors/handleError');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const loginService = {
  async newUser(email, password) {
    if (!email || !password) handleError('Some required fields are missing', 'invalid');
    const { error } = schema.validate({ email, password });
    const exists = await model.User.findOne({ where: { email } });
    // const exists = await User.findAll();
    console.log('exists:', exists);
    if (error || !exists) handleError('Invalid fields', 'invalid');

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return token;
  },
};

module.exports = loginService;