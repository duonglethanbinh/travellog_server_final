const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const Reviewscontent = mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
module.exports = mongoose.model('contacts', Reviewscontent);
