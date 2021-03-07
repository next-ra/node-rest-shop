const { NODE_ENV, JWT_SECRET, PORT, MONGO_DB } = process.env;

module.exports = {
  PORT: PORT || 3000,
  MONGODB:
    NODE_ENV === 'production'
      ? MONGO_DB
      : 'mongodb://localhost:27017/node-rest-shop',
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
