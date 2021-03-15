const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Unauthorized = require('../../customErrors/Unauthorized');
const NotFound = require('../../customErrors/NotFound');
const { usersResponses } = require('../../libs/messages');

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
    });
    res.status(201).send({
      message: usersResponses.created,
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .select('+password')
      .orFail(new Unauthorized(usersResponses.forbidden));
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      throw new Unauthorized(usersResponses.forbidden);
    } else {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        config.JWT_SECRET,
        {
          expiresIn: '3h',
        },
      );
      res.status(200).json({ message: usersResponses.login, token });
    }
  } catch (err) {
    next(err);
  }
};
exports.delete_user = async (req, res, next) => {
  try {
    const id = req.params.userId;
    await User.deleteOne({ _id: id }).orFail(
      new NotFound(usersResponses.notFound),
    );
    res.status(200).json({ message: usersResponses.deleted + id });
  } catch (err) {
    next(err);
  }
};

exports.get_all_users = async (req, res, next) => {
  try {
    const users = await User.find().select('-__v');
    const response = {
      count: users.length,
      users: users.map((u) => {
        return {
          ...u._doc,
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.test = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};

  if (endIndex < (await User.countDocuments())) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    result.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    result.results = await User.find().limit(limit).skip(startIndex);
    res.send(result);
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
