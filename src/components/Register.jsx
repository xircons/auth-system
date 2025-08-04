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
  const [submitted, setSubmitted] = useState(false);
  
  // Field-specific error states
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Validation functions
  const validateName = (name, fieldName) => {
    if (!name) {
      return `${fieldName} is required`;
    }
    if (name.length < 2) {
      return `${fieldName} must be at least 2 characters long`;
    }
    if (name.length > 50) {
      return `${fieldName} must be less than 50 characters`;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return `${fieldName} cannot contain numbers or special characters`;
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email format';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return 'Confirm password is required';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleFirstnameChange = (e) => {
    const value = e.target.value;
    setFirstname(value);
    if (submitted) setFirstnameError(validateName(value, 'First name'));
    else setFirstnameError('');
  };

  const handleLastnameChange = (e) => {
    const value = e.target.value;
    setLastname(value);
    if (submitted) setLastnameError(validateName(value, 'Last name'));
    else setLastnameError('');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (submitted) setEmailError(validateEmail(value));
    else setEmailError('');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Don't validate password in real-time for security
    if (submitted) {
      setPasswordError(validatePassword(value));
      // Re-validate confirm password when password changes
      if (confirmPassword) {
        setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
      }
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (submitted) setConfirmPasswordError(validateConfirmPassword(value, password));
    else setConfirmPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const firstnameValidation = validateName(firstname, 'First name');
    const lastnameValidation = validateName(lastname, 'Last name');
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPassword, password);
    
    setFirstnameError(firstnameValidation);
    setLastnameError(lastnameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);
    
    // Show general error only if all fields are missing
    if (!firstname && !lastname && !email && !password && !confirmPassword) {
      setError('All fields are required');
      setShowError(true);
      return;
    } else {
      setError('');
      setShowError(false);
    }
    
    // If any field has an error, do not submit (but don't show general error)
    if (firstnameValidation || lastnameValidation || emailValidation || passwordValidation || confirmPasswordValidation) {
      return;
    }
    
    onRegister(firstname, email);
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
                onChange={handleFirstnameChange}
                placeholder="First Name *"
                className={submitted && firstnameError ? 'error' : ''}
                required
              />
              {submitted && firstnameError && <div className="field-error">{firstnameError}</div>}
            </div>
            <div className="form-group">
              <input
                type="text"
                value={lastname}
                onChange={handleLastnameChange}
                placeholder="Last Name *"
                className={submitted && lastnameError ? 'error' : ''}
                required
              />
              {submitted && lastnameError && <div className="field-error">{lastnameError}</div>}
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email Address *"
                className={submitted && emailError ? 'error' : ''}
                required
              />
              {submitted && emailError && <div className="field-error">{emailError}</div>}
            </div>
            <div className="form-group password-group" style={{marginBottom: submitted && passwordError ? 0 : undefined}}>
              <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password *"
                  className={submitted && passwordError ? 'error' : ''}
                  style={{flex: 1}}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <i className={`far ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </button>
              </div>
              {submitted && passwordError && <div className="field-error">{passwordError}</div>}
            </div>
            <div className="form-group password-group" style={{marginBottom: submitted && confirmPasswordError ? 0 : undefined}}>
              <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm Password *"
                  className={submitted && confirmPasswordError ? 'error' : ''}
                  style={{flex: 1}}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  <i className={`far ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </button>
              </div>
              {submitted && confirmPasswordError && <div className="field-error">{confirmPasswordError}</div>}
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