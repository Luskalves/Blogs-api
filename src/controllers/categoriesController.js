const userService = require('../services/userService');
const categoriesService = require('../services/categoriesService');

const categoriesController = {
  async get(req, res) {
    const token = req.headers.authorization;
    await userService.validateToken(token);

    const allCategories = await categoriesService.getAll();
    
    res.status(200).json(allCategories);
  },

  async post(req, res) {
    const { name } = req.body;
    const token = req.headers.authorization;
    await userService.validateToken(token);
    
    const newCategory = await categoriesService.newCategory(name);
  
    res.status(201).json(newCategory);
  },
};

module.exports = categoriesController;