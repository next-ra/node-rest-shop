const { ObjectId } = require('mongodb');
const { errorsResponses } = require('../../libs/messages');
const BadRequest = require('../../customErrors/BadRequest');

module.exports.checkId = (req, res, next) => {
  console.log(req.body);
  if (ObjectId.isValid(req.params.id)) {
    return next();
  }
  next(new BadRequest(errorsResponses.id));
};
