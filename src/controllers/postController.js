const userService = require('../services/userService');
const postService = require('../services/postService');

const postController = {
  async get(req, res) {
    const token = req.headers.authorization;
    await userService.validateToken(token);

    const [posts, category] = await postService.getAll();

    res.status(200).json([...posts, { category }]);
  },

  async post(req, res) {
    const { categoryIds } = req.body;
    const token = req.headers.authorization;

    await userService.validateToken(token);
    await postService.validateCatgories(categoryIds);
    
    const newPost = await postService.newPost(req.body, token);
    await postService.newBlogCategory(newPost.id, categoryIds);
    
    res.status(201).json(newPost);
  },
};

module.exports = postController;