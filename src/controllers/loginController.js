const loginService = require('../services/loginservice');

const loginController = {
  async post(req, res) {
    const { email, password } = req.body;
  
    const token = await loginService.newUser(email, password);
  
    res.status(200).json({ token });
  },
};

module.exports = loginController;