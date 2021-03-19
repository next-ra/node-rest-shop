const router = require('express').Router();
const usersController = require('../controllers/users');
const User = require('../models/user');
const paginate = require('../middlewares/paginate');
const { checkId } = require('../middlewares/check-id');
const { updateUserValidate } = require('../middlewares/celebrate-validate');

router.delete('/:id', usersController.delete_user);

router.get('/', paginate(User));

router.get('/me', usersController.get_me);

router.get('/:id', checkId, usersController.get_user);

router.patch('/me', updateUserValidate, usersController.update_user);

module.exports = router;
