const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

userRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' });
  }
  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await newUser.save();

  response.json(savedUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

module.exports = userRouter;
