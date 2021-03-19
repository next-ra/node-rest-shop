const jwt = require('jsonwebtoken');
const config = require('../../config');
const Unauthorized = require('../../customErrors/Unauthorized');
const { usersResponses } = require('../../libs/messages');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new Unauthorized(usersResponses.needAuth);
  }

  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new Unauthorized(usersResponses.needAuth);
  }
  req.user = payload;

  next();
};
