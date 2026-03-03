import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Register.css';

export default function Register() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { name, email, password }); // ✅ Correct
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Try again.');
    }
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Left Panel */}
        <div className="welcome-panel">
          <div className="logo">
            <div className="logo-icon">
              <span className="logo-text">Diprella</span>
            </div>
          </div>

          <div className="welcome-content">
            <h1 className="welcome-title">Welcome Back!</h1>
            <p className="welcome-subtitle">
              To keep connected with us please<br />
              login with your personal info
            </p>
            <button 
              type="button" 
              className="sign-in-btn"
              onClick={handleSignInClick}
              aria-label="Navigate to login"
            >
              SIGN IN
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="form-panel">
          <div className="form-content">
            <h2 className="form-title">Create Account</h2>

            <div className="social-buttons">
              <button type="button" className="social-btn facebook" aria-label="Facebook">
                <span>f</span>
              </button>
              <button type="button" className="social-btn google" aria-label="Google">
                <span>G+</span>
              </button>
              <button type="button" className="social-btn linkedin" aria-label="LinkedIn">
                <span>in</span>
              </button>
            </div>

            <p className="form-subtitle">or use your email for registration:</p>

            <form onSubmit={handleSubmit} className="register-form">
              {error && <div className="error-box">{error}</div>}

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="form-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="form-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="submit-btn">
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
