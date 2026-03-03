import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPassword, setShow] = useState(false);
  const navigate                = useNavigate();
  const { login }               = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password }); // ✅ Correct API
      login(res.data.token, res.data.user);                            // ✅ Store user
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left illustration panel */}
      <div className="illustration-panel">
        <div className="stars">
          <span className="star" style={{ top: '20%', left: '10%' }} />
          <span className="star" style={{ top: '32%', left: '40%' }} />
          <span className="star" style={{ top: '24%', right: '32%' }} />
          <span className="star" style={{ top: '40%', right: '20%' }} />
          <span className="star" style={{ top: '16%', left: '50%' }} />
        </div>
        <div className="moon-wrapper">
          <div className="moon">
            <div className="crater crater1" />
            <div className="crater crater2" />
          </div>
          <div className="hill hill1" />
          <div className="hill hill2" />
        </div>
        <div className="illustration-text">
          <h3>Login your account to get full experience</h3>
          <p>Try Qubicle to unlock premium features</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="form-panel">
        <div className="form-card">
          <h2>Welcome Back!</h2>
          <h3>Good Morning</h3>
          <p className="subtitle">Login to your account</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="error-box">{error}</div>}

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShow(prev => !prev)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="label-right">
              {/* Optional: implement this or remove */}
              <button type="button" className="link-btn" disabled>
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          <div className="extra-link">
            <button onClick={() => navigate('/register')} className="link-btn">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
