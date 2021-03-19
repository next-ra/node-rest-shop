const mongoose = require('mongoose');

module.exports.locationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      default: null,
    },
    city: {
      type: String,
      required: true,
      default: null,
    },
  },
  { _id: false },
);
