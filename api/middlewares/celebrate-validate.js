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
        phone: Joi.string()
          .pattern(
            new RegExp(
              /^((\+7|8))\s?\(?\d{3}-?\s?\)?\s?\d{3}-?\s?\d{2}-?\s?\d{2}\s?$/,
            ),
          )
          .messages(errors),
        location: Joi.object()
          .keys({
            country: Joi.string().default(null).messages(errors),
            city: Joi.string().default(null).messages(errors),
          })
          .messages(errors),
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

const updateUserValidate = celebrate(
  {
    body: Joi.object()
      .keys({
        phone: Joi.string()
          .pattern(
            new RegExp(
              /^((\+7|8))\s?\(?\d{3}-?\s?\)?\s?\d{3}-?\s?\d{2}-?\s?\d{2}\s?$/,
            ),
          )
          .messages(errors),
        location: Joi.object().keys({
          country: Joi.string().default(null).messages(errors),
          city: Joi.string().default(null).messages(errors),
        }),
      })
      .messages(errors),
  },
  { abortEarly: false },
);

module.exports = {
  createUserValidate,
  loginValidate,
  createProductValidate,
  updateUserValidate,
};
