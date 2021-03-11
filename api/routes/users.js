const router = require('express').Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
