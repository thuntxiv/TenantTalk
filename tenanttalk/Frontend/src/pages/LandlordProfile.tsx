// src/pages/LandlordProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from '../components/Review.tsx';
import '../styles/LandlordProfile.css';
import { useAuth } from '../components/AuthContext.tsx';

interface Property {
  id: number;
  address: string;
  image: string;
  beds: number;
  baths: number;
  price: number;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

interface Landlord {
  id: string;
  name: string;
  profileImage: string;
  email: string;
  phone: string;
  bio: string;  responseRate: number;
  rating: number;
  properties: Property[];
  reviews: Review[];
}

const defaultImage = require('../imgs/avatar1.jpg'); // Default image for landlord profile
const defaultProperty = require('../imgs/Studio_listing_1.jpeg'); // Default image for properties

const LandlordProfilePage = () => {
  const { id: landlordId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [landlordData, setLandlordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch landlord + props + reviews
  useEffect(() => {
    if (!landlordId) return;
    setLoading(true);
    setError(null);
    const getLandlords = async() => {
      await fetch(`https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/landlords/${landlordId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Landlord) => {
        console.log(data);
        setLandlordData(data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load landlord profile.');
      })
      .finally(() => setLoading(false));
    }
    getLandlords();
  }, [landlordId]);

  // Review submission
  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!user || !landlordData) {
      alert('You must be signed in to leave a review.');
      return;
    }

    const payload = {
      reviewType: 'landlord',
      landlordID: landlordData._id,
      userID: user.id,
      rating: rating,
      description: comment,
      userAvatar: user.picture
    };

    try {
      const res = await fetch(`https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        throw new Error(err.error || res.statusText);
      }
      // refresh landlord data
      console.log("Review submitted successfully!");
      const refreshed = await fetch(`https://tenanttalkers-ff36b9b495cc.herokuapp.com/api/landlords/${landlordId}`)
        .then(r => {
          if (!r.ok) throw new Error('Refresh failed');
          return r.json();
        });
      setLandlordData(refreshed);
      setShowReviewForm(false);
    } catch (err: any) {
      console.error(err);
      alert('Error submitting review: ' + err.message);
    }
  };

  const handleBack = () => navigate(-1);

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => {
          const cls = i < full ? 'full' : (i === full && half ? 'half' : 'empty');
          return (
            <span key={i} className={`star ${cls}`}>
              {i < full || (i === full && half) ? '★' : '☆'}
            </span>
          );
        })}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  if (loading) {
    return <div className="landlord-profile-page">Loading...</div>;
  }
  if (error) {
    return <div className="landlord-profile-page">Error: {error}</div>;
  }
  if (!landlordData) {
    return <div className="landlord-profile-page">Landlord not found.</div>;
  }

  return (
    <div className="landlord-profile-page">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={landlordData.photoURL || defaultImage} alt={landlordData.name} className="profile-image" />
        </div>
        <div className="profile-info">
          <h1 className="landlord-name">{landlordData.name}</h1>
          <div className="rating-section">
            {renderStars(landlordData.averageRating)}
            <span className="review-count">
              ({landlordData.reviews.length} review{landlordData.reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
          <div className="profile-details">
            <div className="detail-item"><span className="detail-label">Email:</span> <span className="detail-value">{landlordData.email || "Not Found"}</span></div>
            <div className="detail-item"><span className="detail-label">Phone:</span> <span className="detail-value">{landlordData.phone || "Not Found"}</span></div>
          </div>
          <button className="write-review-button" onClick={() => setShowReviewForm(true)}>Write a Review</button>
        </div>
      </div>

      <div className="profile-bio">
        <h2>About {landlordData.name}</h2>
        <p>{landlordData.description}</p>
      </div>

      <div className="properties-section">
        <h2>Properties ({landlordData.properties.length})</h2>
        <div className="property-cards">
          {landlordData.properties.map(p => {
            const photoUrl = p.photoURL ? p.photoURL[0] : defaultProperty;
            return (
              <div key={p._id} className="property-card" onClick={() => navigate(`/listings/${p._id}`)}>
                <img src={photoUrl} alt={p.address} className="property-image" />
                <div className="property-info">
                  <h3>{p.address}</h3>
                  <div className="propexxxxxxxxxxx  x`rty-details">
                    <span>{p.bedrooms || "?"} bed{p.bedrooms > 1 && 's'}</span> • <span>{p.bathrooms || "?"} bath{p.bathrooms > 1 && 's'}</span>
                  </div>
                  <div className="property-price">${p.rent}/month</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="reviews">
        {showReviewForm ? (
          <div className="review-form-section">
            <h2>Write a Review</h2>
            <ReviewForm onSubmit={handleReviewSubmit} onCancel={() => setShowReviewForm(false)} />
          </div>
        ) : (
          <div className="reviews-section">
            <div className="reviews-header">
              <h2>Reviews ({landlordData.reviews.length})</h2>
              <button className="write-review-button mobile" onClick={() => setShowReviewForm(true)}>Write a Review</button>
            </div>
            <div className="reviews-list">
              {landlordData.reviews.map(r => (
                <div key={r._id} className="review-card">
                  <div className="review-header">
                    <img src={r.userImage} alt={r.username} className="reviewer-image" />
                    <div className="reviewer-info">
                      <h3>{r.username}</h3>
                      <div className="review-rating">{renderStars(r.rating)}</div>
                      <div className="review-date">{new Date(r.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="review-comment">{r.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandlordProfilePage;
