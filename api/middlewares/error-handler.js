const { errorsResponses } = require('../../libs/messages');

module.exports = {
  errorHandler: (err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message || errorsResponses.internal,
      name: err.name,
      status: err.status || 500,
    });
  },
};
