const router = require('express').Router();

const usersController = require('../controllers/users');
router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.delete('/:userId', usersController.delete_user);

router.get('/', usersController.get_all_users);

module.exports = router;
