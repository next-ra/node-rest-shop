const { ObjectId } = require('mongodb');
module.exports.checkId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('invalid Product ID');
  }
  return id;
};
