const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const limiter = require('./api/middlewares/limiter');
const config = require('./config');

const routes = require('./api/routes/index');
const { cors } = require('./api/middlewares/cors');
const { checkError } = require('./api/middlewares/check-error');
const { checkWrongImage } = require('./api/middlewares/check-wrong-image');

const { errorHandler } = require('./api/middlewares/error-handler');
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
app.use(limiter);
app.use(routes);
app.use(checkWrongImage);
app.use(checkError);
app.use(errorHandler);
app.listen(config.PORT, () => {
  console.log(`Сервер работает на ${config.PORT} порту`);
});
