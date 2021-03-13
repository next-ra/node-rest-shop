const router = require('express').Router();
const checkAuth = require('../middlewares/check-auth');
const ordersController = require('../controllers/orders');

router.get('/', checkAuth, ordersController.orders_get_all);

router.post('/', checkAuth, ordersController.orders_create_one);

router.get('/:orderId', checkAuth, ordersController.orders_get_one);

router.delete('/:orderId', checkAuth, ordersController.orders_delete_one);

module.exports = router;
