const { celebrate, Joi } = require('celebrate');
const { errors } = require('../../libs/celebrate-messages');
const { template } = require('../../libs/template-of-celebrate');

const createUserValidate = celebrate(
  {
    body: Joi.object()
      .keys({
        name: template.name.required(),
        email: template.email,
        password: template.password,
        phone: template.phone.default(null),
        location: template.location.keys({
          country: template.string.default(null),
          city: template.string.default(null),
        }),
      })
      .messages(errors),
  },
  { abortEarly: false },
);

const loginValidate = celebrate(
  {
    body: Joi.object()
      .keys({
        email: template.email,
        password: template.password,
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
        name: template.name,
        phone: template.phone,
        location: template.location
          .keys({
            country: template.string,
            city: template.string,
          })
          .messages(errors),
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
