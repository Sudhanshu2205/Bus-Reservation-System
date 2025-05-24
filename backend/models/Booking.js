const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: String,
  from: String,
  to: String,
  date: String,
  seats: Number,
  availableSeats: Number
});

module.exports = mongoose.model('Bus', busSchema);