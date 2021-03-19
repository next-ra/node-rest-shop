const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/users');
const { checkError } = require('./api/middlewares/check-error');
const { checkWrongImage } = require('./api/middlewares/check-wrong-image');
const { errorsResponses } = require('./libs/messages');
const { pageNotFound } = require('./api/middlewares/page-not-found');
mongoose
  .connect(config.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('База данных подключена'))
  .catch(() => console.log('Ошибка подключения к базе данных'));

// app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);
app.use(pageNotFound);
app.use(checkWrongImage);
app.use(checkError);
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || errorsResponses.internal,
    name: err.name,
    status: err.status || 500,
  });
});
app.listen(config.PORT, () => {
  console.log(`Сервер работает на ${config.PORT} порту`);
});
