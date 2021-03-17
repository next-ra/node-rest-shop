const errors = {
  'string.alphanum': '{#key} - english only, from 2 to 30 keys ',
  'string.empty': '{#key} - this fiels can not be empty ',
  'string.min': '{#key} - minimum length is: {#limit} ',
  'string.max': '{#key} - maximum length is: {#limit} ',
  'any.required': '{#key} - required field ',
  'string.email': '{#key} - must be valid',
  'any.custom': '{#key} - link must be valid',
  'object.unknown': '{#key} - invalid field',
};

module.exports = {
  errors,
};
