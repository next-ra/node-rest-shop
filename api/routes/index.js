const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const checkAuth = require('../middlewares/check-auth');
const { pageNotFound } = require('../middlewares/page-not-found');
const {
  createUserValidate,
  loginValidate,
} = require('../middlewares/celebrate-validate');
const usersController = require('../controllers/users');
const usersRoutes = require('./users');
const ordersRoutes = require('./orders');
const productsRoutes = require('./products');

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signup', createUserValidate, usersController.signup);
router.post('/login', loginValidate, usersController.login);
router.post('/logout', usersController.logout);
router.use(checkAuth);
router.use('/users', usersRoutes);
router.all('*', pageNotFound);

module.exports = router;
