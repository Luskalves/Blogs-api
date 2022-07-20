const { Router } = require('express');
const rescue = require('express-rescue');
const postController = require('../controllers/postController');

const postRoute = Router();

postRoute.get('/', rescue(postController.get));

postRoute.post('/', rescue(postController.post));

module.exports = postRoute;