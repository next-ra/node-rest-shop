const Order = require('../models/order');
const Product = require('../models/product');
const NotFound = require('../../customErrors/NotFound');
const { ordersResponses, productsResponses } = require('../../libs/messages');
exports.orders_get_all = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .orFail(new NotFound(ordersResponses.noOrders))
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
};

exports.orders_create_one = async (req, res, next) => {
  try {
    await Product.findById(req.body.product).orFail(
      new NotFound(productsResponses.notFound),
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
};

exports.orders_get_one = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id)
      .select('-__v')
      .populate('product')
      .orFail(new NotFound(productsResponses.notFound));
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
};

exports.orders_delete_one = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    await Order.deleteOne({ _id: id }).orFail(
      new NotFound(ordersResponses.notFound),
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
};
