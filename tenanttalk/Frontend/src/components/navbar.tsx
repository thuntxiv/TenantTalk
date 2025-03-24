import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
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
          <a href="/agents" className="nav-link">Forum</a>
          <a href="/login" className="nav-link contact-btn">Login</a>
          <a href="/contact" className="nav-link contact-btn">Profile</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;