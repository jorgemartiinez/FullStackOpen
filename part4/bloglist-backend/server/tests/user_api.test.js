const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { usersInDb } = require('../utils/list_helper');

const api = supertest(app);

describe('API USER tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = bcrypt.hashSync('secret', 10);
    const user = new User({ username: 'jorge', name: 'Jorge Martinez', passwordHash });
    await user.save();
  });

  describe('POST users', () => {
    test('creating new user with already existing username', async () => {
      const usersAtStart = await usersInDb();
      const newUser = {
        username: 'jorge',
        name: 'Jorge Martinez',
        password: 'siiiiuuuuuuuuuuu',
      };
      let response = await api.post('/api/users').send(newUser);
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('is already on use!');
      const newUsers = await usersInDb();
      expect(newUsers).toHaveLength(usersAtStart.length);
    });

    test('creating new user with password less than 3', async () => {
      const usersAtStart = await usersInDb();
      const newUser = {
        username: 'jorgem',
        name: 'Jorge Martinez',
        password: 'ab',
      };
      let response = await api.post('/api/users').send(newUser);
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('at least 3 characters long');
      const newUsers = await usersInDb();
      expect(newUsers).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
