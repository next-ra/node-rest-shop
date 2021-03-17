const router = require('express').Router();
const usersController = require('../controllers/users');
const User = require('../models/user');
const paginate = require('../middlewares/paginate');
const { userValidate } = require('../middlewares/celebrate-validate');
router.post('/signup', userValidate, usersController.signup);

router.post('/login', userValidate, usersController.login);

router.delete('/:userId', usersController.delete_user);

router.get('/', paginate(User));

module.exports = router;
