module.exports = {
  modelsResponses: {
    required: 'Field is required',
    wrongEmail: 'Must be a valid email address',
    uniq: 'Email must be unique',
  },
  usersResponses: {
    created: 'User created',
    deleted: 'User deleted with ID:',
    notFound: 'User is not found',
    login: 'Auth successful',
    needAuth: 'Auth is required',
    forbidden: 'Wrong email or password',
  },
  productsResponses: {
    created: 'Product created',
    deleted: 'Product deleted with ID:',
    notFound: 'Product is not found',
    updated: 'Product updated',
    noProducts: 'No products created yet',
    noImage: 'Image must be provided',
  },
  ordersResponses: {
    created: 'Order created',
    deleted: 'Order deleted with ID:',
    notFound: 'Order is not found',
    noOrders: 'No orders created yet',
  },
  errorsResponses: {
    notFound: 'Resource is not found',
    wrongId: 'Wrong id format',
    internal: 'Internal error',
    uniq: 'Email must be unique',
    id: 'Invalid id format',
  },
};
