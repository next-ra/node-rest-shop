module.exports = {
  modelsResponses: {
    required: 'Field is required',
    wrongEmail: 'Must be a valid email address',
    uniq: 'Email must be unique',
  },
  usersResponses: {
    created: 'User created',
    login: 'Auth successful',
    needAuth: 'Auth is required',
    forbidden: 'Wrong email or password',
    notFound: 'User is not found',
  },
  ProductsResponses: {
    created: 'Product created',
    deleted: 'Product deleted',
    notFound: 'Product is not found',
  },
  errorsResponses: {
    notFound: 'Resource is not found',
    wrongId: 'Wrong id format',
    internal: 'Internal error',
    uniq: 'Email must be unique',
  },
};
