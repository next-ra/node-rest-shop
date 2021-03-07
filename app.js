const express = require('express');
const app = express();
const config = require('./config');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.listen(config.PORT, () => {
  console.log(`Сервер работает на ${config.PORT} порту`);
});
