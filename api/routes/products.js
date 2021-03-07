const router = require('express').Router();
const Product = require('../models/product');
const NotFound = require('../../customErrors/NotFound');
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({
      name,
      price,
    });
    res.status(201).json({
      message: 'Продукт создан',
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id).orFail(
      new NotFound('Продукт не найден'),
    );
    res.status(200).json({
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:productId', async (req, res, next) => {
  try {
    // const id = req.params.productId;
    // User.findByIdAndUpdate(
    //   req.user._id,
    //   {
    //     name: req.body.name,
    //     about: req.body.about,
    //   },
    //   { runValidators: true, new: true },
    // );

    await Product.findByIdAndUpdate(
      req.params.productId,
      {
        name: req.body.name,
        price: req.body.price,
      },
      { runValidators: true, new: true },
    ).orFail(new NotFound('Продукт не найден'));
    res.status(200).json(res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    await Product.remove({ _id: id }).orFail(new NotFound('Продукт не найден'));
    res.status(200).json({
      message: 'product has been delete',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
