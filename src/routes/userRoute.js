const { Router } = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');

const userRoute = Router();

userRoute.get('/', rescue(userController.get));

userRoute.get('/:id', rescue(userController.getById));

userRoute.post('/', rescue(userController.post));

module.exports = userRoute;