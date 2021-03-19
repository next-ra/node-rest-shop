const router = require('express').Router();
const usersController = require('../controllers/users');
const User = require('../models/user');
const paginate = require('../middlewares/paginate');

router.delete('/:userId', usersController.delete_user);

router.get('/', paginate(User));

router.get('/me', usersController.get_user);

module.exports = router;
