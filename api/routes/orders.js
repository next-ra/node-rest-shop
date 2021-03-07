const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'orders were fetched',
  });
});

router.post('/', (req, res, next) => {
  const { productId, quantity } = req.body;
  const order = {
    productId,
    quantity,
  };
  res.status(201).json({
    message: 'order was created',
    order: order,
  });
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: 'order details',
    id,
  });
});

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: 'order deleted successfully',
    id,
  });
});

module.exports = router;
