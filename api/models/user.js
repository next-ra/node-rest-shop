const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const locationSchema = require('./location');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => isEmail(v),
  },
  password: {
    type: String,
    minlength: 3,
    required: [true, 'password is required minLength: 3'],
    select: false,
  },
  phone: {
    type: String,
    defaultStatus: null,
  },
  location: {
    type: locationSchema,
    default: {
      country: null,
      city: null,
    },
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
