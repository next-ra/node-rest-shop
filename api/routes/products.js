const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: '/products GET request',
  });
});

router.post('/', (req, res, next) => {
  const { name, price } = req.body;
  const product = {
    name,
    price,
  };
  res.status(201).json({
    message: 'Продукт создан',
    createdProduct: product,
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'S P E C I A L',
      id,
    });
  } else {
    res.status(200).json({
      message: `U get a product with this id: ${id}`,
      id,
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  res.status(201).json({
    message: 'updated product',
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'product has been delete',
  });
});

module.exports = router;
