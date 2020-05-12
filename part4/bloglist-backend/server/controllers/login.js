const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  // ? do we have all params?
  if (!body.username || !body.password) {
    return response.json({
      err: 'Password and username are required!',
    });
  }

  // ? user not exists or password is incorrect (better to don't give more specific info on this case)
  const user = await User.findOne({ username: body.username });
  let isCorrect = bcrypt.compareSync(body.password, user.passwordHash);
  if (!user || !isCorrect) {
    return response.json({ error: 'Your password or username are not correct' });
  }

  // ? all data is correct so let's create a token to send to user
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  let token = jwt.sign(userForToken, process.env.SECRET);

  response.json({ token: token, username: user.username });
});

module.exports = loginRouter;
