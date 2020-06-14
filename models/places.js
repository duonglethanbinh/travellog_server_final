const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const Reviewscontent = mongoose.Schema({
  name: String,
  image: String,
});

module.exports = mongoose.model('places', Reviewscontent);
