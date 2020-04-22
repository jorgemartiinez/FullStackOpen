const express = require('express');
const app = express();

app.use('/api', require('./phonebook.routes'));

module.exports = app;
