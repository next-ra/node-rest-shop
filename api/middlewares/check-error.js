const { isCelebrateError } = require('celebrate');
const BadRequest = require('../../customErrors/BadRequest');
const Conflict = require('../../customErrors/Conflict');
const { errorsResponses } = require('../../libs/messages');

module.exports.checkError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const error = err.details.get('body'); // достаем ошибки из Map
    const message = error.details.map((err) => err.message).join(', '); // добавил join для лучшей читабельности ответа
    return next(new BadRequest(message));
  }
  if (err.name === 'ValidationError') throw new BadRequest(err.message);
  if (err.name === 'CastError') throw new BadRequest(errorsResponses.wrongId);
  next(err);
};
