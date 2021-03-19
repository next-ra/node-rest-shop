const router = require('express').Router();
const usersRoutes = require('./users');
const ordersRoutes = require('./orders');
const productsRoutes = require('./products');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));