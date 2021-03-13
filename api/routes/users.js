const router = require('express').Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const user = await User.create({
      email,
      password: hash,
    });
    res
      .status(201)
      .send({ message: `user created`, _id: user._id, email: user.email });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .select('+password')
      .orFail(new Error('Auth failed with email')); // TODO: add custom errors status
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      throw new Error('Auth failed here'); // TODO: add custom errors status
    } else {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        config.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      );
      res.status(200).json({ message: 'Auth successful', token });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: `User with ID:${id} deleted` });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).select('-__v');
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
});

module.exports = router;
