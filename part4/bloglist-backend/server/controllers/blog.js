const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { verifyToken } = require('../utils/middlewares');

blogRouter.get('/', async (request, response, next) => {
  let blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });
  response.json(blogs);
});

blogRouter.post('/', verifyToken, async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({
      err: 'No token provided.',
    });
  }
  const decoded = request.token;

  if (!request.body.title && !request.body.url) {
    return response.status(400).json({
      err: 'Title and url are required',
    });
  }

  let oneUser = await User.findById(decoded.id);
  request.body.user = oneUser.id;
  const blog = new Blog(request.body);
  const result = await blog.save();

  oneUser.blogs = oneUser.blogs.concat(blog._id);
  await oneUser.save();

  response.status(201).json(result);
});

blogRouter.delete('/:id', verifyToken, async (request, response, next) => {
  const id = request.params.id;
  if (!request.token) {
    return response.status(401).json({
      err: 'No token provided.',
    });
  }
  // id is missing
  if (!id) {
    return response.status(400).json({
      err: 'id is missing!',
    });
  }
  let blog = await Blog.findById(id);

  // ? blog doesnt exist
  if (!blog) {
    return response.status(404).json({
      err: 'Blog not found!',
    });
  }

  // ? check if blog.user != user.id

  const userId = request.token.id;

  if (blog.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'The blog that you are trying to delete is not yours!' });
  }

  await blog.remove();

  return response.json({
    blog,
  });
});

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;

  let updated = {
    author: request.body.author,
    title: request.body.title,
    likes: request.body.likes,
    url: request.body.url,
  };

  if (!id) {
    return response.status(400).json({
      err: 'id is missing!',
    });
  }

  let updatedBlog = await Blog.findByIdAndUpdate(id, updated, { new: true });

  if (!updatedBlog) {
    return response.status(404).json({
      err: 'Blog not found!',
    });
  }
  return response.json({
    updatedBlog,
  });
});

module.exports = blogRouter;
