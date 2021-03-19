const router = require('express').Router();
const usersController = require('../controllers/users');
const User = require('../models/user');
const checkAuth = require('../middlewares/check-auth');
const paginate = require('../middlewares/paginate');
const {
  createUserValidate,
  loginValidate,
} = require('../middlewares/celebrate-validate');
router.post('/signup', createUserValidate, usersController.signup);

router.post('/login', loginValidate, usersController.login);

router.delete('/:userId', checkAuth, usersController.delete_user);

router.get('/', paginate(User));

router.get('/me', checkAuth, usersController.get_user);

module.exports = router;
