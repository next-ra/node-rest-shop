class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'Not Found Error';
  }
}
module.exports = NotFound;
