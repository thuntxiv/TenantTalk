import React from 'react';
import '../styles/landlords.css';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';

const Landlords: React.FC = () => {
  return (
    <div className="landlords-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <h1 className="landlords-heading">Landlords</h1>
      <p className="landlords-intro">
        Welcome to the Landlords page! Here you can view information about landlords that list properties on TenantTalk.
      </p>

      <div>
        <h2 className="landlords-featured">Featured Landlords</h2>
        <ul className="landlords-list">
          <li>
            <strong>John Doe</strong> - Experienced landlord with several rental properties.
          </li>
          <li>
            <strong>Jane Smith</strong> - Specializes in family-friendly rental homes.
          </li>
          <li>
            <strong>Acme Properties</strong> - Trusted property management company.
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>If you’d like to leave a review for a landlord, please click the link below:</p>
      </div>
      <Footer />
    </div>
    
  );
};

export default Landlords;
