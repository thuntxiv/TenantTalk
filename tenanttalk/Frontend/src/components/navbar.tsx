import React from 'react';
import '../styles/navbar.css';
import GoogleLoginButton from '../components/LoginModal.tsx';
import { useAuth } from './AuthContext.tsx';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">TenantTalk</span>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link active">About Us</a>
          <a href="/properties" className="nav-link">Properties</a>
          <a href="/agents" className="nav-link">Forum</a>
          <a href="/contact" className="nav-link contact-btn">Contact Us</a>
          {isAuthenticated && (
            <a href="/profile" className="nav-link">My Profile</a>
          )}
          
          <div className="auth-section">
            <GoogleLoginButton 
              className="navbar-google-login"  
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;