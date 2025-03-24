// GoogleLoginButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.tsx';
import '../styles/LoginModal.css';

const GoogleLoginButton = ({ className }) => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`google-auth-button ${className || ''}`}>
      {!isAuthenticated ? (
        <button 
          onClick={handleLogin} 
          className="google-login-button"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="user-auth-container">
          <span className="user-info">
            {user?.picture && (
              <img src={user.picture} alt={user.name} className="user-avatar" />
            )}
            <span className="user-name">{user?.name}</span>
          </span>
          <button 
            onClick={handleLogout}
            className="google-logout-button"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;