// package requires
const express = require('express');
require('express-async-errors'); // errores sin try/catch
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

// midlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/blogs', blogRouter);

// custom middlewares
app.use(unknownEndpoint);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

module.exports = app;
