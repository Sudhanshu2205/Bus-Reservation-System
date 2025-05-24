const mongoose = require('mongoose');
const Bus = require('backend\models\Bus'); // adjust path to your Bus model

const mongoURI = 'mongodb+srv://1rn22is153sudhanshukumar:1rn22is153@cluster0.bcucgxv.mongodb.net/busbooking?retryWrites=true&w=majority'; // e.g., mongodb+srv://...

const seedBuses = async () => {
  await mongoose.connect(mongoURI);
  await Bus.deleteMany(); // Optional: clear existing data

  const cities = ['New York', 'Boston', 'Chicago', 'San Francisco', 'Los Angeles', 'Seattle', 'Houston', 'Miami', 'Denver', 'Atlanta'];
  const buses = [];

  for (let i = 1; i <= 50; i++) {
    const from = cities[Math.floor(Math.random() * cities.length)];
    let to;
    do {
      to = cities[Math.floor(Math.random() * cities.length)];
    } while (to === from);

    buses.push({
      name: `Bus ${i}`,
      from,
      to,
      date: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      departure: `${Math.floor(Math.random() * 18 + 5)}:${['00', '15', '30', '45'][Math.floor(Math.random() * 4)]}`,
      arrival: `${Math.floor(Math.random() * 18 + 5)}:${['00', '15', '30', '45'][Math.floor(Math.random() * 4)]}`,
      seats: 40,
      availableSeats: Math.floor(Math.random() * 35 + 5),
      price: Math.floor(Math.random() * 90 + 10),
    });
  }

  await Bus.insertMany(buses);
  console.log('50 buses inserted!');
  process.exit();
};

seedBuses();
