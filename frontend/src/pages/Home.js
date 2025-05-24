import { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import './Home.css';


export default function Home() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/busRoutes')
      .then(res => setBuses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Available Buses</h1>
        <p>Select your ride below and book your seats today!</p>
      </div>

      {loading ? (
        <p className="loading">Loading buses…</p>
      ) : buses.length === 0 ? (
        <p className="no-data">No buses found.</p>
      ) : (
        <div className="buses-grid">
          {buses.map(bus => (
            <div key={bus._id} className="bus-card">
              <div className="bus-header">
                <span className="bus-route">
                  {bus.from} → {bus.to}
                </span>
                <span className="bus-date">
                  {new Date(bus.date).toLocaleDateString()}
                </span>
              </div>
              <div className="bus-info">
                <span>Bus #: {bus.busNumber || '—'}</span>
                <span>
                  Seats Left: {bus.availableSeats}/{bus.seats}
                </span>
              </div>
              <Link to="/booking" state={{ bus }} className="btn-book">
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
