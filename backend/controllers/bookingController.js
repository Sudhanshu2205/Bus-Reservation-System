const Booking = require('../models/Booking');
const BusModel = require('../models/Bus');

exports.bookTicket = async (req, res) => {
  try {
    const { busId, seatsBooked } = req.body;
    const seats = Number(seatsBooked);
    if (!busId || !Number.isInteger(seats) || seats < 1) {
      return res.status(400).json({ msg: 'Valid busId and seatsBooked are required' });
    }

    const bus = await BusModel.findOneAndUpdate(
      { _id: busId, availableSeats: { $gte: seats } },
      { $inc: { availableSeats: -seats } },
      { new: true }
    );

    if (!bus) {
      return res.status(400).json({ msg: 'Not enough seats available' });
    }

    const booking = new Booking({
      user: req.user.id,
      bus: busId,
      seatsBooked: seats,
      totalFare: seats * bus.price
    });
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
    if (String(booking.user) !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to cancel this booking' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ msg: 'Booking already cancelled' });
    }

    const bus = await BusModel.findById(booking.bus);
    if (bus) {
      bus.availableSeats += booking.seatsBooked;
      if (bus.availableSeats > bus.seats) {
        bus.availableSeats = bus.seats;
      }
      await bus.save();
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({ msg: 'Booking canceled', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
