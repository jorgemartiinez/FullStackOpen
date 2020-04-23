// package requires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// routers
const blogRouter = require('./controllers/blog');
// utils
const { unknownEndpoint, errorHandler } = require('./utils/middlewares');
const config = require('./utils/config');
const logger = require('./utils/logger');

// app init
const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

// midlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/blogs', blogRouter);

// custom middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
