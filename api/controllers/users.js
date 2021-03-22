const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const NotFound = require('../../customErrors/NotFound');
const { usersResponses } = require('../../libs/messages');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, location, phone } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      location,
      phone,
    });
    res.status(201).send(
      //   {
      //   message: usersResponses.created,
      //   _id: user._id,
      //   email: user.email,
      // }
      { data: user },
    );
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
    });
    res.status(200).json({ message: usersResponses.login });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
    });
    res.status(200).send({ message: 'You are logout now' });
  } catch (err) {
    next(err);
  }
};
exports.get_me = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id)
      .select('-__v')
      .orFail(new NotFound(usersResponses.notFound));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

exports.get_user = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-__v')
      .orFail(new NotFound(usersResponses.notFound));
    res.json({ data: user });
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

exports.update_user = async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      runValidators: true,
      new: true,
    })
      .select('-__v')
      .orFail(new NotFound(usersResponses.notFound));
    res.json({ message: 'User updated', data: updatedUser });
  } catch (err) {
    next(err);
  }
};
