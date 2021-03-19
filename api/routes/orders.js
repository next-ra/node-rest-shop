const router = require('express').Router();
const ordersController = require('../controllers/orders');
const { checkId } = require('../middlewares/check-id');
router.get('/', ordersController.orders_get_all);

router.post('/', ordersController.orders_create_one);

router.get('/:id', checkId, ordersController.orders_get_one);

router.delete('/:id', checkId, ordersController.orders_delete_one);

module.exports = router;
