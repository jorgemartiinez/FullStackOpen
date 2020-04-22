require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { requestLogger, errorHandler } = require('./middlewares/middlewares');
const cors = require('cors');

// express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Peticiones cors
app.use(cors());

// static files on build folder (will search for a index.html file)
app.use(express.static('build'));

// morgan logs config
morgan.token('body', function (request, response) { return JSON.stringify(request.body) }); // new token to stringify the body inside request
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body')); // custom morgan config to show body params

// custom middlewares
app.use(requestLogger);

// import routes
app.use(require('./routes/index.routes'));

// error midleware
app.use(errorHandler);

const PORT = process.env.PORT;
// mongodb connection
require('./connection/mongo');
// server connection
app.listen(PORT, (err) => { if (err) throw err; console.log(`Server listening on port ${PORT}`); });