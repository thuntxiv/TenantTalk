import React from 'react';
import '../styles/navbar.css';
import GoogleLoginButton from '../components/LoginModal.tsx';
import { useAuth } from './AuthContext.tsx';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  // returns the navbar UI, add more links here as needed
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/" ><span className="logo-icon">🏠</span>
          <span className="logo-text">TenantTalk</span></a>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link active">About Us</a>
          <a href="/properties" className="nav-link">Properties</a>
          <a href="/landlords" className="nav-link">Landlords</a>
          <a href="/forum" className="nav-link">Forum</a>
          <a href="/dm">Message</a>
          {isAuthenticated && (
            <a href="/profile" className="nav-link contact-btn">My Profile</a>
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