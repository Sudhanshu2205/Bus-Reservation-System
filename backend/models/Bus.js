const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, trim: true, unique: true },
  operatorName: { type: String, trim: true, default: 'City Transit' },
  from: { type: String, required: true, trim: true },
  to: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  departureTime: { type: String, default: '' },
  arrivalTime: { type: String, default: '' },
  busType: {
    type: String,
    enum: ['AC Sleeper', 'AC Seater', 'Non-AC Sleeper', 'Non-AC Seater', 'Volvo'],
    default: 'AC Seater'
  },
  amenities: [{ type: String }],
  price: { type: Number, required: true, min: 1, default: 500 },
  seats: { type: Number, required: true, min: 1 },
  availableSeats: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
