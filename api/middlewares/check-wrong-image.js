const { unlink } = require('fs');
const { isCelebrateError } = require('celebrate');
module.exports.checkWrongImage = (err, req, res, next) => {
  if (isCelebrateError(err) && req.file) {
    unlink(req.file.path, (error) => {});
    return next(err);
  }
  next(err);
};
