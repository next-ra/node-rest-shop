const router = require('express').Router();
const Order = require('../models/order');
const Product = require('../models/product');
const NotFound = require('../../customErrors/NotFound');
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .select('-__v')
      .populate('product', 'name');
    const response = {
      count: orders.length,
      orders: orders.map((o) => {
        return {
          ...o._doc,
          request: {
            description: 'Get order details',
            type: 'GET',
            url: `http://localhost:3000/orders/${o._id}`,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await Product.findById(req.body.product).orFail(
      new NotFound('Продукт не найден'),
    );
    const { product, quantity } = req.body;
    const order = await Order.create({
      product,
      quantity,
    });
    res.status(201).json({
      message: 'Order was created',
      order: {
        ...order._doc,
        request: {
          description: 'Get order details',
          type: 'GET',
          url: `http://localhost:3000/orders/${order._id}`,
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id)
      .select('-__v')
      .populate('product')
      .orFail(new NotFound('Order is not found'));
    res.status(200).json({
      order,
      request: {
        description: 'Get all orders',
        type: 'GET',
        url: `http://localhost:3000/orders`,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId;
    await Order.deleteOne({ _id: id }).orFail(
      new NotFound('Order is not found'),
    );
    res.status(200).json({
      message: `Order with this id:${id} deleted`,
      request: {
        description: 'To create a new order',
        type: 'POST',
        url: `http://localhost:3000/orders`,
        body: {
          productId: 'ID',
          quantity: 'Number',
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
