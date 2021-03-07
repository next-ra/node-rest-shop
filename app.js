const express = require('express');
const app = express();
const morgan = require('morgan');

const config = require('./config');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || 'enternal error',
      status: err.status,
    },
  });
});
app.listen(config.PORT, () => {
  console.log(`Сервер работает на ${config.PORT} порту`);
});
