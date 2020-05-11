const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response, next) => {
  let blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  if (!request.body.title && !request.body.url) {
    return response.status(400).json({
      err: 'Title and url are required',
    });
  }
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  if (!id) {
    return response.status(400).json({
      err: 'id is missing!',
    });
  }
  let deletedBlog = await Blog.findByIdAndRemove(id);
  if (!deletedBlog) {
    return response.status(404).json({
      err: 'Blog not found!',
    });
  }
  return response.json({
    deletedBlog,
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
