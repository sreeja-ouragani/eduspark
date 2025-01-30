import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../services/authService'; // Import login and signup services
import '../components/LoginPage.css';
import logo from '../assets/images/logo.jpg'; // Logo image
import background from '../assets/images/new_background.png'; // Background image
import googlePlay from '../assets/images/google-play.jpg'; // Google Play button
import appStore from '../assets/images/app-store.jpg'; // App Store button

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false); // For admin/user toggle
  const [isSignup, setIsSignup] = useState(false); // To toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For signup
  const [phone, setPhone] = useState(''); // For signup
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Toggle between admin and user login
  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      navigate('/home', { state: { role: response.role } });
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try { // eslint-disable-next-line
      const response = await signupUser({ name, email, password, phone });
      alert('Signup successful! Please log in.');
      setIsSignup(false); // Go back to login after successful signup
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="left-section">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="welcome-text">
            <h1>
              <span className="welcome">Welcome to</span>
              <br />
              <span className="kiddoclass animated-slide">KiddoClass</span>
            </h1>
            <p className="quotation">-Where little minds explore, learn, and shine</p>
          </div>
        </div>
      </div>

      <div className="right-section">
        {isSignup ? (
          // Signup Form
          <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already registered?{' '}
              <span
                className="link"
                onClick={() => setIsSignup(false)}
              >
                Login here
              </span>
            </p>
          </div>
        ) : (
          // Login Form
          <div>
            <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button type="submit">{isAdmin ? 'Admin Sign In' : 'User Sign In'}</button>
            </form>
            <div className="login-options">
              {!isAdmin && (
                <p>
                  New User?{' '}
                  <span
                    className="link"
                    onClick={() => setIsSignup(true)}
                  >
                    Signup
                  </span>
                </p>
              )}
              <p>
                <span
                  className="link forgot-password"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Toggle Button for Switching Between Admin and User */}
        <div className="toggle-container">
          <label htmlFor="role-toggle" className="toggle-label">
            Switch to {isAdmin ? 'User' : 'Admin'} Login
          </label>
          <input
            id="role-toggle"
            type="checkbox"
            className="toggle-checkbox"
            checked={isAdmin}
            onChange={handleToggle}
          />
        </div>

        <div className="store-buttons">
          <img src={googlePlay} alt="Google Play" />
          <img src={appStore} alt="App Store" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
