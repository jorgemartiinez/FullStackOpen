/* MONGOOSE CONNECTION */
const mongoose = require('mongoose');
const path = require('path');
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("DB Connected Successfully");
});