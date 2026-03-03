const Bus = require('../models/Bus');

exports.addBus = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      seats: Number(req.body.seats),
      availableSeats: Number(req.body.availableSeats ?? req.body.seats),
      price: Number(req.body.price ?? 500)
    };

    if (!payload.busNumber || !payload.from || !payload.to || !payload.date) {
      return res.status(400).json({ msg: 'busNumber, from, to and date are required' });
    }
    if (payload.from === payload.to) {
      return res.status(400).json({ msg: 'Source and destination must be different' });
    }
    if (payload.availableSeats > payload.seats) {
      return res.status(400).json({ msg: 'availableSeats cannot be greater than total seats' });
    }

    const bus = new Bus(payload);
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const filter = {};
    if (from) filter.from = new RegExp(`^${from}$`, 'i');
    if (to) filter.to = new RegExp(`^${to}$`, 'i');
    if (date) filter.date = date;

    const buses = await Bus.find(filter).sort({ date: 1, departureTime: 1, createdAt: 1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Bus deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
