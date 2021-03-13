const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersController = require('../controllers/users');
router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.delete('/:userId', usersController.delete_user);

router.get('/', usersController.get_all_users);

module.exports = router;
