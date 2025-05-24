const express = require('express');
const routerBooking = express.Router();
const authBooking = require('../middleware/auth');
const {
  bookTicket,
  getUserBookings,
  cancelBooking
} = require('../controllers/bookingController');

routerBooking.post('/', authBooking, bookTicket);          // Book a ticket
routerBooking.get('/', authBooking, getUserBookings);      // View your bookings
routerBooking.delete('/:id', authBooking, cancelBooking); // Cancel a booking

module.exports = routerBooking;