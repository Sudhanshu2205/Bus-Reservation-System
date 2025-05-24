import React, { useEffect, useState } from 'react';

const AvailableBuses = () => {
  const [buses, setBuses] = useState([]);
  const token = localStorage.getItem('token'); // or useContext if using auth context

  useEffect(() => {
    fetch('http://localhost:5000/api/buses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setBuses(data))
      .catch(err => console.error('Error fetching buses:', err));
  }, []);

  return (
    <div>
      <h2>Available Buses</h2>
      {buses.length > 0 ? (
        buses.map((bus) => (
          <div key={bus._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h3>{bus.busNumber}</h3>
            <p>From: {bus.from}</p>
            <p>To: {bus.to}</p>
            <p>Date: {bus.date}</p>
            <p>Seats: {bus.availableSeats}/{bus.seats}</p>
          </div>
        ))
      ) : (
        <p>No buses found.</p>
      )}
    </div>
  );
};

export default AvailableBuses;
