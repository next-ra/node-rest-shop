const { Joi } = require('celebrate');
const { errors } = require('./celebrate-messages');

const template = {
  name: Joi.string().min(3).max(30).alphanum().messages(errors),

  email: Joi.string()
    .required()
    .email({ allowUnicode: false })
    .messages(errors),

  password: Joi.string().required().min(3).messages(errors),

  phone: Joi.string()
    .pattern(
      new RegExp(
        /^((\+7|8))\s?\(?\d{3}-?\s?\)?\s?\d{3}-?\s?\d{2}-?\s?\d{2}\s?$/,
      ),
    )
    .messages(errors),

  location: Joi.object().messages(errors),

  string: Joi.string().messages(errors),
};

module.exports = {
  template,
};
