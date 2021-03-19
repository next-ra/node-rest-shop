const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Unauthorized = require('../../customErrors/Unauthorized');
const NotFound = require('../../customErrors/NotFound');
const { usersResponses } = require('../../libs/messages');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
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
          expiresIn: '7d',
        },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).json({ message: usersResponses.login });
    }
  } catch (err) {
    next(err);
  }
};

exports.get_user = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-__v')
      .orFail(new NotFound(usersResponses.notFound));
    res.send({ data: user });
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
