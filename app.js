const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./config');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/users');
const { cors } = require('./api/middlewares/cors')
const { checkError } = require('./api/middlewares/check-error');
const { checkWrongImage } = require('./api/middlewares/check-wrong-image');
const { pageNotFound } = require('./api/middlewares/page-not-found');
const {errorHandler} = require('./api/middlewares/error-handler')
mongoose
  .connect(config.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('База данных подключена'))
  .catch(() => console.log('Ошибка подключения к базе данных'));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);
app.use(pageNotFound);
app.use(checkWrongImage);
app.use(checkError);
app.use(errorHandler);
app.listen(config.PORT, () => {
  console.log(`Сервер работает на ${config.PORT} порту`);
});
