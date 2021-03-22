const errors = {
  'string.alphanum': '{#key} - english only, from 2 to 30 keys',
  'string.empty': '{#key} - this field can not be empty',
  'string.min': '{#key} - minimum length is: {#limit}',
  'string.max': '{#key} - maximum length is: {#limit}',
  'any.required': '{#key} - required field',
  'string.email': '{#key} - must be valid',
  'any.custom': '{#key} - link must be valid',
  'object.unknown': '{#key} - invalid field',
  'string.pattern.base': '{#key} - must be in this format: +7 123 456 78 90',
};

module.exports = {
  errors,
};
