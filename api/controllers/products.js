const Product = require('../models/product');
const { unlink } = require('fs');
const NotFound = require('../../customErrors/NotFound');
const BadRequest = require('../../customErrors/BadRequest');
const { productsResponses } = require('../../libs/messages');

exports.get_all = async (req, res, next) => {
  try {
    const products = await Product.find()
      .select('-__v') // remove version in response
      .orFail(new NotFound(productsResponses.noProducts));

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
};

exports.create_product = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      throw new BadRequest(productsResponses.noImage);
    }
    const image = req.file.path;
    const product = await Product.create({
      name,
      price,
      image,
    });
    res.status(201).json({
      message: productsResponses.created,
      createdProduct: {
        _id: product._id,
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
};

exports.get_product = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id)
      .select('-__v')
      .orFail(new NotFound(productsResponses.notFound));
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
};

exports.update_product = async (req, res, next) => {
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
      .orFail(new NotFound(productsResponses.notFound));
    res.status(200).json({
      message: productsResponses.updated,
      data: product,
      request: {
        type: 'GET',
        url: `http://localhost:3000/products/${product._id}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.delete_product = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findByIdAndDelete(id).orFail(
      new NotFound(productsResponses.notFound),
    );
    unlink(product.image, (err) => {
      if (err) throw err;
      console.log(product.image + ' deleted');
    });
    res.status(200).json({
      message: productsResponses.deleted + id,

      request: {
        description: 'Create a new product',
        type: 'POST',
        url: `http://localhost:3000/products`,
        body: {
          name: 'String',
          price: 'Number',
          image: 'Path-to-image',
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
