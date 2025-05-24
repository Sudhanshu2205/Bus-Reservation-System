const Booking = require('../models/Booking');
const BusModel = require('../models/Bus');

exports.bookTicket = async (req, res) => {
  try {
    const { busId, seatsBooked } = req.body;
    const bus = await BusModel.findById(busId);
    if (!bus || bus.availableSeats < seatsBooked) {
      return res.status(400).json({ msg: 'Not enough seats available' });
    }
    bus.availableSeats -= seatsBooked;
    await bus.save();

    const booking = new Booking({ user: req.user.id, bus: busId, seatsBooked });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('bus');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    const bus = await BusModel.findById(booking.bus);
    bus.availableSeats += booking.seatsBooked;
    await bus.save();

    await booking.remove();
    res.json({ msg: 'Booking canceled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};