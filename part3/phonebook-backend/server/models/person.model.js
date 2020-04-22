const { Schema, model } = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.plugin(uniqueValidator, { message: '{PATH} must que unique' });

module.exports = model('Person', personSchema, 'phonebook');