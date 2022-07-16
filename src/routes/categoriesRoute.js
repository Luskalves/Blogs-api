const { Router } = require('express');
const rescue = require('express-rescue');
const userService = require('../services/userService');
const categoriesService = require('../services/categoriesService');

const categoriesRoute = Router();

categoriesRoute.post('/', rescue(async (req, res) => {
  const { name } = req.body;
  const token = req.headers.authorization;
  await userService.validateToken(token);
  
  const newCategory = await categoriesService.newCategory(name);

  res.status(201).json(newCategory);
}));

module.exports = categoriesRoute;