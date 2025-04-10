import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/landlords.css';

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
    // In a real app, you would fetch data from your API. Here we simulate with mock data.
    const fetchLandlords = async () => {
      try {
        setLoading(true);
        const mockData: Landlord[] = [
          {
            id: '1',
            name: 'John Smith',
            profileImage: 'https://via.placeholder.com/150',
            properties: 12,
            rating: 4.7,
            reviewCount: 34
          },
          {
            id: '2',
            name: 'Emily Johnson',
            profileImage: 'https://via.placeholder.com/150',
            properties: 8,
            rating: 4.5,
            reviewCount: 21
          },
          {
            id: '3',
            name: 'Michael Rodriguez',
            profileImage: 'https://via.placeholder.com/150',
            properties: 5,
            rating: 4.9,
            reviewCount: 15
          },
          {
            id: '4',
            name: 'Sarah Williams',
            profileImage: 'https://via.placeholder.com/150',
            properties: 3,
            rating: 4.2,
            reviewCount: 9
          },
          {
            id: '5',
            name: 'David Chen',
            profileImage: 'https://via.placeholder.com/150',
            properties: 15,
            rating: 4.8,
            reviewCount: 42
          }
        ];
        setLandlords(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load landlords. Please try again later.');
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
      {/* Full-width Navbar */}
      <Navbar />

      {/* Main forum content centered at max-width */}
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
                key={landlord.id}
                className="landlord-card"
                onClick={() => handleLandlordClick(landlord.id)}
              >
                <img
                  src={landlord.profileImage}
                  alt={`${landlord.name}`}
                  className="landlord-image"
                />
                <div className="landlord-info">
                  <h3 className="landlord-name">{landlord.name}</h3>
                  <p className="property-count">
                    {landlord.properties} {landlord.properties === 1 ? 'Property' : 'Properties'}
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

      {/* Full-width Footer */}
      <Footer />
    </div>
  );
};

export default LandlordListPage;
