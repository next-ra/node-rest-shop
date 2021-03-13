const jwt = require('jsonwebtoken');
const config = require('../../config');
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (err) {
    next(new Error('auth failed in auth-check'));
  }
};
