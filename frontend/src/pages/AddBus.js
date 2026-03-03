import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddBus() {
  const [busNumber, setBusNumber]     = useState('');
  const [from, setFrom]               = useState('');
  const [to, setTo]                   = useState('');
  const [date, setDate]               = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice]             = useState('');
  const [seats, setSeats]             = useState('');
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);
  const navigate                      = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/buses', {
        busNumber,
        from,
        to,
        date,
        departureTime,
        arrivalTime,
        price: Number(price),
        seats: Number(seats),
        availableSeats: Number(seats),
      });
      navigate('/');   // back to Home on success
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add bus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addbus-container">
      <h2>Add New Bus</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Bus Number
          <input
            value={busNumber}
            onChange={e => setBusNumber(e.target.value)}
            required
          />
        </label>
        <label>
          From
          <input
            value={from}
            onChange={e => setFrom(e.target.value)}
            required
          />
        </label>
        <label>
          To
          <input
            value={to}
            onChange={e => setTo(e.target.value)}
            required
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Departure Time
          <input
            type="time"
            value={departureTime}
            onChange={e => setDepartureTime(e.target.value)}
          />
        </label>
        <label>
          Arrival Time
          <input
            type="time"
            value={arrivalTime}
            onChange={e => setArrivalTime(e.target.value)}
          />
        </label>
        <label>
          Price (INR)
          <input
            type="number"
            min="1"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Total Seats
          <input
            type="number"
            min="1"
            value={seats}
            onChange={e => setSeats(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Bus'}
        </button>
      </form>
    </div>
  );
}
