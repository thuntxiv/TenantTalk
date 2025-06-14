import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/landlords.css';

const Avatar1 = require('../imgs/avatar1.jpg');
const Avatar2 = require('../imgs/avatar2.jpg');
const Avatar3 = require('../imgs/avatar3.png');

// Types
interface Landlord {
  id: string;
  name: string;
  profileImage: string;
  properties: number;
  rating: number;
  reviewCount: number;
}

const LandlordListPage: React.FC = () => {
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandlords = async () => {
      try {
        setLoading(true);
        fetch('https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/landlords')
          .then(response => response.json())
          .then(data => {
            setLandlords(data);
            setLoading(false);
          })
          .catch(err => {
            setError('Failed to load landlords. Please try again later.');
            setLoading(false);
          });
      } catch (err) {
        setError('Failed to load landlords. Please try again later.');
      } finally {
        setLoading(false);
      }

    };
    fetchLandlords();
  }, []);

  const handleLandlordClick = (landlordId: string) => {
    navigate(`/landlords/${landlordId}`);
  };

  const filteredLandlords = landlords.filter(landlord =>
    landlord.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render Star Rating helper
  const renderStars = (rating: number, reviewCount: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={
            i < fullStars
              ? "star full"
              : (i === fullStars && hasHalfStar)
                ? "star half"
                : "star empty"
          }>
            {i < fullStars
              ? "★"
              : (i === fullStars && hasHalfStar)
                ? "★"
                : "☆"}
          </span>
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
        <span className="review-count">({reviewCount} reviews)</span>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading landlords...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="landlord-page-wrapper">
      <Navbar />
      <div className="landlord-list-page">
        <div className="landlord-list-header">
          <h1>Landlords</h1>
          <p>Find and review landlords in your area</p>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for landlords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="landlord-cards-container">
          {filteredLandlords.length > 0 ? (
            filteredLandlords.map(landlord => (
              <div
                key={landlord._id}
                className="landlord-card"
                onClick={() => handleLandlordClick(landlord._id)}
              >
                <img
                  src={`${landlord.photoURL || Avatar1}`}
                  alt={`${landlord.name}`}
                  className="landlord-image"
                />
                <div className="landlord-info">
                  <h3 className="landlord-name">{landlord.name}</h3>
                  <p className="property-count">
                    {landlord.propertyCount} {landlord.propertyCount === 1 ? 'Property' : 'Properties'}
                  </p>
                  {renderStars(landlord.rating, landlord.reviewCount)}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No landlords found matching "{searchTerm}"</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandlordListPage;
