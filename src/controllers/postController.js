const userService = require('../services/userService');
const postService = require('../services/postService');

const postController = {
  async get(req, res) {
    const token = req.headers.authorization;
    await userService.validateToken(token);

    const [posts, category] = await postService.getAll();

    res.status(200).json([...posts, { category }]);
  },

  async getById(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;
    await userService.validateToken(token);
    const postId = await postService.getById(id);

    res.status(200).json(postId);
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

  async put(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;
    await userService.validateToken(token);
    await postService.validateUserToken(id, token);

    const postChanged = await postService.changePost(id, req.body);

    res.status(200).json(postChanged);
  },
};

module.exports = postController;