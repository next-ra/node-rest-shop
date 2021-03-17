const router = require('express').Router();
const usersController = require('../controllers/users');
const User = require('../models/user');
const paginate = require('../middlewares/paginate');
router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.delete('/:userId', usersController.delete_user);

router.get('/', paginate(User));

module.exports = router;
