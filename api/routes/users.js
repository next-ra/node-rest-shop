const router = require('express').Router();
const usersController = require('../controllers/users');
const User = require('../models/user');
const paginate = require('../middlewares/paginate');
const {
  createUserValidate,
  loginValidate,
} = require('../middlewares/celebrate-validate');
router.post('/signup', createUserValidate, usersController.signup);

router.post('/login', loginValidate, usersController.login);

router.delete('/:userId', usersController.delete_user);

router.get('/', paginate(User));

module.exports = router;
