const { celebrate, Joi } = require('celebrate');
const { errors } = require('../../libs/celebrate-messages');

const createUserValidate = celebrate(
  {
    body: Joi.object()
      .keys({
        name: Joi.string()
          .required()
          .min(3)
          .max(30)
          .alphanum()
          .messages(errors),
        email: Joi.string()
          .required()
          .email({ allowUnicode: false })
          .messages(errors),
        password: Joi.string().required().min(3).messages(errors),
      })
      .messages(errors),
  },
  { abortEarly: false },
);

const loginValidate = celebrate(
  {
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email({ allowUnicode: false })
          .messages(errors),
        password: Joi.string().required().min(3).messages(errors),
      })
      .messages(errors),
  },
  { abortEarly: false },
);

const createProductValidate = celebrate(
  {
    body: Joi.object()
      .keys({
        name: Joi.string().required().alphanum().messages(errors),
        price: Joi.string().required().alphanum().messages(errors),
      })
      .messages(errors),
  },
  { abortEarly: false },
);

module.exports = {
  createUserValidate,
  loginValidate,
  createProductValidate,
};
