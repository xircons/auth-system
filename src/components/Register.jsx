import React, { useState, useEffect } from 'react';

function Register({ onRegister, onSwitchToLogin }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstname && lastname && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setShowError(true);
        return;
      }
      setError('');
      setShowError(false);
      onRegister(firstname, email);
    } else {
      setError('Please fill in all fields.');
      setShowError(true);
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className="register-page">
      <div className="section-left">
        <h1>
        Auth<br />System
        </h1>
        <p>
        Secure access to your system,<br />
        with a focus on modern design,<br />
        consistent structure, and<br />
        seamless authentication flow.<br />
        Built to be minimal, fast,<br />
        and easy to use — every time.
        </p>
        <div className="designer-credit">Design by <a href="https://github.com/xircons" target="_blank" rel="noopener noreferrer">xircons</a></div>
      </div>
      
      <div className="section-right">
        <div className="register-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name *"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name *"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address *"
              />
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password *"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`far ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
            </div>
            <div className="form-group password-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password *"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`far ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
            </div>
            {showError && <div className="error-message slide-out">{error}</div>}
            <button type="submit">Sign Up</button>
          </form>
          <div className="login-link">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}>Already have an account? Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register; 