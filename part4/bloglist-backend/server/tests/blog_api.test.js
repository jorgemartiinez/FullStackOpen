const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  { title: 'The best online bootcamps', author: 'Pepito Palotes', url: 'idontknow.com', likes: '40' },
  { title: 'List of most awaited games of 2020', author: 'Dave Brown', url: 'fuckjsfuckexpress.es', likes: '35' },
];

describe('api blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });
  describe('GET methods', () => {
    test('returns posts in JSON format', async () => {
      let response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(2);
    });

    test('blogs have an id property', async () => {
      let res = await api.get('/api/blogs');

      res.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
      });
    });

    test('succesfully creates a new post', async () => {
      const newBlog = new Blog({ title: 'I want this to work', author: 'Hello darkness my old friend', url: 'pleasework.com', likes: '10' });
      newBlog.save();
      let res = await api.get('/api/blogs');
      let newLength = initialBlogs.length + 1;
      expect(res.body).toHaveLength(newLength);
    });
  });

  describe('POST methods', () => {
    test('if likes is missing, default value is 0', async () => {
      const newBlog = { title: 'test', author: 'Test', url: 'jest.com' };
      let response = await api
        .post('/api/blogs')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvcmdlIiwiaWQiOiI1ZWJhODkwMTU5Njc4NTNmMDAxNzBkYjIiLCJpYXQiOjE1ODkyODQ4MTN9.vmpKUe8OoiPOX2zIGZmqrRHfxZps7pJw2h0eJb7rGJU'
        )
        .send(newBlog);
      expect(response.body.likes).toBe(0);
    });

    test('title and url are missing, returns 400', async () => {
      const newBlog = { author: 'Test', likes: 3 };
      await api
        .post('/api/blogs')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvcmdlIiwiaWQiOiI1ZWJhODkwMTU5Njc4NTNmMDAxNzBkYjIiLCJpYXQiOjE1ODkyODQ4MTN9.vmpKUe8OoiPOX2zIGZmqrRHfxZps7pJw2h0eJb7rGJU'
        )
        .send(newBlog)
        .expect(400);
    });
  });

  describe('DELETE methods', () => {
    test('if id dont exist', async () => {
      await api
        .delete('/api/blogs/asdasdasdas')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvcmdlIiwiaWQiOiI1ZWJhODkwMTU5Njc4NTNmMDAxNzBkYjIiLCJpYXQiOjE1ODkyODQ4MTN9.vmpKUe8OoiPOX2zIGZmqrRHfxZps7pJw2h0eJb7rGJU'
        )
        .expect(500);
    });
    test('return deleted object', async () => {
      let response = await api
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvcmdlIiwiaWQiOiI1ZWJhODkwMTU5Njc4NTNmMDAxNzBkYjIiLCJpYXQiOjE1ODkyODQ4MTN9.vmpKUe8OoiPOX2zIGZmqrRHfxZps7pJw2h0eJb7rGJU'
        )
        .delete('/api/blogs/5eb9899718ddd52af0906468');
      expect(response.body.title).toEqual(initialBlogs[1].title);
    });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
