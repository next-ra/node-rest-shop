const NotFound = require('../../customErrors/NotFound');
const { errorsResponses } = require('../../libs/messages');
module.exports.pageNotFound = (req, res, next) => {
  throw new NotFound(errorsResponses.notFound);
};
