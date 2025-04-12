import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <span className="footer-logo-icon">🏠</span>
            <span className="footer-logo-text">TenantTalk</span>
            <p className="footer-tagline">
              Your one-stop rental source to find and promote the perfect housing experience for finding your dream home.
            </p>
            <button className="footer-cta-btn">Learn More</button>
          </div>
          {/* first column */}
          <div className="footer-links-container">
            <div className="footer-links-column">
              <h4>Pages</h4>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/properties">Properties</a>
              <a href="/contact">Contact</a>
              <a href="/landlords">Land Lords</a>
            </div>
            {/* second column */}
            <div className="footer-links-column">
              <h4>Terms</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/faq">FAQ</a>
              <a href="/help">Help</a>
            </div>
            {/* third column */}
            <div className="footer-links-column">
              <h4>Security</h4>
              <a href="/security">Security</a>
              <a href="/payment">Payment</a>
              <a href="/service">Service Status</a>
            </div>
            {/* fourth column */}
            <div className="footer-links-column">
              <h4>Social Media</h4>
              <a href="https://facebook.com">Facebook</a>
              <a href="https://twitter.com">Twitter</a>
              <a href="https://instagram.com">Instagram</a>
              <a href="https://linkedin.com">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 TenantTalk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;