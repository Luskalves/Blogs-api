const { Router } = require('express');
const rescue = require('express-rescue');
const postController = require('../controllers/postController');

const postRoute = Router();

postRoute.get('/', rescue(postController.get));

postRoute.get('/:id', rescue(postController.getById));

postRoute.post('/', rescue(postController.post));

postRoute.put('/:id', rescue(postController.put));

module.exports = postRoute;