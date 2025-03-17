import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
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
          <a href="/contact" className="nav-link contact-btn">Profile</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;