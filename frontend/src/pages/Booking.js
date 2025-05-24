import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';

export default function Booking() {
  const { state } = useLocation();
  const bus = state?.bus;
  const [seats, setSeats] = useState(1);

  if (!bus) return <div>Please select a bus from Home page.</div>;

  const handleBook = async () => {
    try {
      await api.post('/bookings', { busId: bus._id, seatsBooked: seats });
      alert('Booking successful!');
    } catch (err) {
      alert(err.response?.data.msg || 'Booking failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Book Bus</h2>
      <div className="mb-2">{bus.from} → {bus.to} on {bus.date}</div>
      <input
        type="number" min="1" max={bus.availableSeats}
        value={seats} onChange={e => setSeats(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={handleBook} className="w-full p-2 bg-blue-500 rounded text-white">
        Book {seats} seat{seats > 1 ? 's' : ''}
      </button>
    </div>
  );
}