require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const Bus = require('../models/Bus');
const User = require('../models/User');
const Booking = require('../models/Booking');

const cities = ['Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Jaipur', 'Surat'];
const operators = ['RedLine Travels', 'InterCity Express', 'GoBus', 'BlueRoute', 'CityConnect'];
const amenitiesPool = ['WiFi', 'Charging Port', 'Water Bottle', 'Blanket', 'GPS Tracking'];
const busTypes = ['AC Sleeper', 'AC Seater', 'Non-AC Sleeper', 'Non-AC Seater', 'Volvo'];

function pad(n) {
  return String(n).padStart(2, '0');
}

function randomTime(minHour = 5, maxHour = 22) {
  const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
  const mins = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  return `${pad(hour)}:${pad(mins)}`;
}

function randomDateWithinDays(days = 15) {
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random() * days));
  return d.toISOString().split('T')[0];
}

function pickDifferentCity(from) {
  let to = from;
  while (to === from) {
    to = cities[Math.floor(Math.random() * cities.length)];
  }
  return to;
}

async function seed() {
  await connectDB();

  await Promise.all([
    Booking.deleteMany({}),
    Bus.deleteMany({}),
    User.deleteMany({})
  ]);

  const [adminHash, userHash] = await Promise.all([
    bcrypt.hash('Admin@123', 10),
    bcrypt.hash('User@123', 10)
  ]);

  const [adminUser, demoUser] = await User.create([
    {
      name: 'Admin User',
      email: 'admin@busbooker.com',
      password: adminHash,
      role: 'admin'
    },
    {
      name: 'Demo User',
      email: 'user@busbooker.com',
      password: userHash,
      role: 'user'
    }
  ]);

  const buses = [];
  for (let i = 1; i <= 40; i += 1) {
    const from = cities[Math.floor(Math.random() * cities.length)];
    const to = pickDifferentCity(from);
    const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
    const seats = busType.includes('Sleeper') ? 36 : 44;
    const booked = Math.floor(Math.random() * 14);
    buses.push({
      busNumber: `BUS-${1000 + i}`,
      operatorName: operators[Math.floor(Math.random() * operators.length)],
      from,
      to,
      date: randomDateWithinDays(20),
      departureTime: randomTime(5, 20),
      arrivalTime: randomTime(7, 23),
      busType,
      amenities: amenitiesPool.sort(() => 0.5 - Math.random()).slice(0, 3),
      price: Math.floor(Math.random() * 2200) + 350,
      seats,
      availableSeats: seats - booked
    });
  }

  const createdBuses = await Bus.insertMany(buses);

  const sampleBookings = createdBuses.slice(0, 3).map((bus, idx) => {
    const seatsBooked = idx + 1;
    return {
      user: demoUser._id,
      bus: bus._id,
      seatsBooked,
      totalFare: seatsBooked * bus.price,
      status: 'confirmed'
    };
  });

  await Booking.insertMany(sampleBookings);

  console.log('Seed completed');
  console.log(`Users created: ${adminUser.email}, ${demoUser.email}`);
  console.log(`Buses created: ${createdBuses.length}`);
  console.log('Demo passwords: Admin@123, User@123');

  await mongoose.connection.close();
}

seed()
  .then(() => process.exit(0))
  .catch(async err => {
    console.error('Seed failed:', err.message);
    try {
      await mongoose.connection.close();
    } catch (_err) {
      // ignore
    }
    process.exit(1);
  });
