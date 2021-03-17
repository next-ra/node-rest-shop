const { celebrate, Joi, Segments } = require('celebrate');
const { errors } = require('../../libs/celebrate-messages');

const userValidate = celebrate(
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

module.exports = {
  userValidate,
};
