const { isCelebrateError, Segments } = require('celebrate');
const BadRequest = require('../../customErrors/BadRequest');
const Conflict = require('../../customErrors/Conflict');
const { errorsResponses } = require('../../libs/messages');

module.exports.checkError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const error = err.details.get('body'); // достаем ошибки из Map
    throw new BadRequest(error.details.map((err) => err.message));
  }
  if (err.name === 'ValidationError') throw new Conflict(errorsResponses.uniq);
  if (err.name === 'CastError') throw new BadRequest(errorsResponses.wrongId);
  next(err);
};
