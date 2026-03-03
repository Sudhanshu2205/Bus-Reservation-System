import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';

export default function Booking() {
  const { state } = useLocation();
  const bus = state?.bus;
  const [seats, setSeats] = useState(1);
  const [remainingSeats, setRemainingSeats] = useState(bus?.availableSeats ?? 0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!bus) return <div>Please select a bus from Home page.</div>;

  const handleBook = async () => {
    setError('');
    setSuccess('');

    const seatsToBook = parseInt(seats, 10);
    if (!seatsToBook || seatsToBook < 1 || seatsToBook > remainingSeats) {
      setError(`Please select a valid number of seats (1-${remainingSeats}).`);
      return;
    }

    try {
      await api.post('/bookings', {
        busId: bus._id,
        seatsBooked: seatsToBook
      });

      setSuccess('Booking successful!');
      setRemainingSeats(prev => prev - seatsToBook);
      setSeats(1);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.msg || 'Booking failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Book Bus</h2>
      <div className="mb-2">
        {bus.from} -&gt; {bus.to} on {new Date(bus.date).toLocaleDateString()}
      </div>
      <div className="mb-2">Departure: {bus.departureTime || 'TBA'} | Arrival: {bus.arrivalTime || 'TBA'}</div>
      <div className="mb-2">Fare per seat: INR {bus.price ?? 'N/A'}</div>
      <div className="mb-2">Seats left: {remainingSeats}</div>

      <input
        type="number"
        min="1"
        max={remainingSeats}
        value={seats}
        onChange={e => setSeats(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}

      <button
        onClick={handleBook}
        className="w-full p-2 bg-blue-500 rounded text-white"
      >
        Book {seats} seat{seats > 1 ? 's' : ''}
      </button>
    </div>
  );
}
