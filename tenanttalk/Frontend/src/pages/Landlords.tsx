import React from 'react';
import Footer from '../components/footer.tsx';
import '../styles/landlords.css';
const Landlords: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Landlords</h1>
      <p>
        Welcome to the Landlords page! Here you can view information about landlords that list properties on TenantTalk.
      </p>

      <div>
        <h2>Featured Landlords</h2>
        <ul>
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
    </div>
  );
};

export default Landlords;
