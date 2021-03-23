const { celebrate, Joi } = require('celebrate');
const { errors } = require('../../libs/celebrate-messages');
const { template } = require('../../libs/template-of-celebrate');
const { checkId } = require('../middlewares/custom-check-id');

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
        name: Joi.string().required().messages(errors),
        price: Joi.number().required().messages(errors),
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

const updateProductValidate = celebrate(
  {
    body: Joi.object()
      .keys({
        name: Joi.string().messages(errors),
        price: Joi.number().messages(errors),
      })
      .messages(errors),
  },
  { abortEarly: false },
);

const createOrderValidate = celebrate({
  body: Joi.object().keys({
    product: Joi.string().required().custom(checkId).messages(errors),
    quantity: Joi.number().default(1).messages(errors),
  }),
});

module.exports = {
  createUserValidate,
  loginValidate,
  createProductValidate,
  updateUserValidate,
  updateProductValidate,
  createOrderValidate,
};
