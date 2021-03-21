const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const locationSchema = require('./location');
const { usersResponses } = require('../../libs/messages');
const Unauthorized = require('../../customErrors/Unauthorized');
const bcrypt = require('bcrypt');
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

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email })
    .select('+password')
    .orFail(new Unauthorized(usersResponses.forbidden));
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Unauthorized(usersResponses.forbidden);
  }
  return user;
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
