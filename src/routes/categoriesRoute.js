const { Router } = require('express');
const rescue = require('express-rescue');
const categoriesController = require('../controllers/categoriesController');

const categoriesRoute = Router();

categoriesRoute.get('/', rescue(categoriesController.get));
categoriesRoute.post('/', rescue(categoriesController.post));

module.exports = categoriesRoute;