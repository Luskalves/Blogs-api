const handleError = require('../errors/handleError');
const userService = require('../services/userService');

const userController = {
  async get(req, res) {
    const token = req.headers.authorization;
    if (!token) return handleError('Token not found', '401');
    await userService.validateToken(token);
    const users = await userService.getUsers();

    res.status(200).json(users);
  },
  async post(req, res) {
    const user = req.body;
    
    const token = await userService.newUser(user);
  
    res.status(201).json({ token });
  },
};

module.exports = userController;
