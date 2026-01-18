import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, X } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import './AuthForm.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const AuthForm = ({ userType: initialUserType = 'customer', onClose, onLoginSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [userType, setUserType] = useState(initialUserType); // 'customer' or 'agent'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const body = mode === 'login' 
        ? { email, password, rememberMe, userType }
        : { email, password, fullName, phone, userType };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        onLoginSuccess?.(data.data.user);
        onClose();
        window.location.reload();
      } else {
        setError(data.message || `${mode === 'login' ? 'Login' : 'Registration'} failed`);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          credential: credentialResponse.credential,
          userType 
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        onLoginSuccess?.(data.data.user);
        onClose();
        window.location.reload();
      } else {
        setError(data.message || 'Google login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-in failed. Please try again.');
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <form className="auth-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <button 
          type="button" 
          className="close-button" 
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <h2 className="auth-title">
          {mode === 'login' 
            ? (userType === 'customer' ? 'Customer Login' : 'Agent Login')
            : (userType === 'customer' ? 'Customer Sign Up' : 'Agent Sign Up')
          }
        </h2>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}
        
        {mode === 'signup' && (
          <>
            <div className="form-group">
              <label className="form-label">I am a</label>
              <div className="profile-selector">
                <button
                  type="button"
                  className={`profile-option ${userType === 'customer' ? 'active' : ''}`}
                  onClick={() => setUserType('customer')}
                  disabled={loading}
                >
                  <span className="profile-icon">👤</span>
                  <span className="profile-label">Customer</span>
                  <span className="profile-desc">Looking to buy/rent</span>
                </button>
                <button
                  type="button"
                  className={`profile-option ${userType === 'agent' ? 'active' : ''}`}
                  onClick={() => setUserType('agent')}
                  disabled={loading}
                >
                  <span className="profile-icon">💼</span>
                  <span className="profile-label">Agent</span>
                  <span className="profile-desc">Real estate professional</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder="Enter your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </>
        )}
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-wrapper">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              className="auth-input" 
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {mode === 'signup' && (
          <div className="form-group">
            <label className="form-label">Phone (Optional)</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                type="tel" 
                className="auth-input" 
                placeholder="Enter your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input 
              type={showPassword ? "text" : "password"}
              className="auth-input" 
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="form-options">
          {mode === 'login' && (
            <>
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading 
            ? (mode === 'login' ? 'Signing In...' : 'Creating Account...') 
            : (mode === 'login' ? 'Sign In' : 'Sign Up')
          }
        </button>

        <p className="signup-text">
          {mode === 'login' ? (
            <>
              Don't have an account?
              <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); setMode('signup'); }}>Sign Up</a>
            </>
          ) : (
            <>
              Already have an account?
              <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); setMode('login'); }}>Sign In</a>
            </>
          )}
        </p>

        <div className="divider">Or With</div>

        {GOOGLE_CLIENT_ID ? (
          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="100%"
              text={mode === 'login' ? 'signin_with' : 'signup_with'}
            />
          </div>
        ) : (
          <button 
            type="button" 
            className="oauth-button google-button"
            onClick={() => setError('Google Sign-In not configured yet')}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
          </button>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
