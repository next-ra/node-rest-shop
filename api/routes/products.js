const router = require('express').Router();
const Product = require('../models/product');
const NotFound = require('../../customErrors/NotFound');
const checkAuth = require('../middlewares/check-auth');
const { upload } = require('../middlewares/multer');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find()
      .select('-__v') // select __v убирает версию в ответе
      .orFail(new NotFound('Продуктов не найдено'));
    const response = {
      count: products.length,
      products: products.map((p) => {
        return {
          ...p._doc,
          request: {
            type: 'GET',
            url: `http://localhost:3000/products/${p._id}`,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  async (req, res, next) => {
    try {
      console.log(req.file.path);
      const { name, price } = req.body;
      const image = req.file.path;
      const product = await Product.create({
        name,
        price,
        image,
      });
      res.status(201).json({
        message: 'Product was created',
        createdProduct: {
          name,
          price,
          image,
          request: {
            type: 'GET',
            url: `http://localhost:3000/products/${product._id}`,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id)
      .select('-__v')
      .orFail(new NotFound('Продукт не найден'));
    res.status(200).json({
      product,
      request: {
        type: 'GET',
        description: 'GET ALL PRODUCTS',
        url: `http://localhost:3000/products`,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:productId', checkAuth, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        name: req.body.name,
        price: req.body.price,
      },
      { runValidators: true, new: true },
    )
      .select('-__v')
      .orFail(new NotFound('Продукт не найден'));
    res.status(200).json({
      message: 'Product updated',
      data: product,
      request: {
        type: 'GET',
        url: `http://localhost:3000/products/${product._id}`,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', checkAuth, async (req, res, next) => {
  try {
    const id = req.params.productId;
    await Product.deleteOne({ _id: id }).orFail(
      new NotFound('Продукт не найден'),
    );
    res.status(200).json({
      message: 'Product deleted successfully',
      request: {
        type: 'POST',
        url: `http://localhost:3000/products`,
        body: {
          name: 'String',
          price: 'Number',
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
