// src/pages/LandlordProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from '../components/Review.tsx';
import '../styles/LandlordProfile.css';
import { useAuth } from '../components/AuthContext.tsx';

const Avatar1 = require('../imgs/avatar1.jpg');
const Avatar2 = require('../imgs/avatar2.jpg');
const Avatar3 = require('../imgs/avatar3.png');
const studioImage = require('../imgs/Studio_listing_1.jpeg');
const loftImage = require('../imgs/Loft_Example.jpg');

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
  bio: string;
  memberSince: string;
  responseRate: number;
  rating: number;
  properties: Property[];
  reviews: Review[];
}

// 1) Define three mock profiles
const MOCK_LANDLORDS: Record<string, Landlord> = {
  '1': {
    id: '1',
    name: 'John Smith',
    profileImage: Avatar1,
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    bio: 'Property manager with over 10 years of experience managing college town apartments. I take pride in maintaining quality housing for students and young professionals.',
    memberSince: '2018-05-12',
    responseRate: 95,
    rating: 4.7,
    properties: [
      { id: 1, address: '123 4th Street, Troy, NY', image: studioImage, beds: 2, baths: 1, price: 650 },
      { id: 2, address: '456 River Street, Troy, NY', image: loftImage, beds: 3, baths: 2, price: 1000 }
    ],
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'Alex Johnson', userImage: Avatar2, rating: 5, comment: 'John was an excellent landlord! Very responsive to maintenance requests and always fair with the deposit return.', date: '2023-12-15' },
      { id: 'r2', userId: 'u2', userName: 'Maria Garcia', userImage: Avatar3, rating: 4, comment: 'Overall a good experience. The property was well-maintained, though sometimes it took a few days to get a response to emails.', date: '2023-10-28' },
    ]
  },
  '2': {
    id: '2',
    name: 'Jane Doe',
    profileImage: Avatar2,
    email: 'jane.doe@example.com',
    phone: '(555) 987-6543',
    bio: 'I specialize in downtown lofts with modern finishes. Always happy to give a tour and answer any questions.',
    memberSince: '2019-08-20',
    responseRate: 90,
    rating: 4.5,
    properties: [
      { id: 3, address: '789 Broadway, Troy, NY', image: loftImage, beds: 1, baths: 1, price: 800 },
      { id: 4, address: '321 Elm Street, Troy, NY', image: studioImage, beds: 2, baths: 2, price: 1200 }
    ],
    reviews: [
      { id: 'r1', userId: 'u3', userName: 'Chris Lee', userImage: Avatar1, rating: 4, comment: 'Great place, but a bit pricey.', date: '2024-01-05' },
      { id: 'r2', userId: 'u4', userName: 'Pat Taylor', userImage: Avatar3, rating: 5, comment: 'Loved the location and amenities!', date: '2024-02-15' },
    ]
  },
  '3': {
    id: '3',
    name: 'Bob Johnson',
    profileImage: Avatar3,
    email: 'bob.johnson@example.com',
    phone: '(555) 222-3333',
    bio: 'Focused on long-term leases in quiet neighborhoods. Contact me for family-friendly homes.',
    memberSince: '2020-11-01',
    responseRate: 88,
    rating: 4.2,
    properties: [
      { id: 5, address: '654 Maple Ave, Troy, NY', image: studioImage, beds: 3, baths: 2, price: 900 },
      { id: 6, address: '987 Pine Street, Troy, NY', image: loftImage, beds: 4, baths: 3, price: 1500 }
    ],
    reviews: [
      { id: 'r1', userId: 'u5', userName: 'Sam Wilson', userImage: Avatar2, rating: 4, comment: 'Bob was very accommodating.', date: '2023-11-20' },
      { id: 'r2', userId: 'u6', userName: 'Dana Cruz', userImage: Avatar1, rating: 4, comment: 'Nice and quiet neighborhood.', date: '2024-03-10' },
    ]
  }
};

const LandlordProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { id: landlordId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 2) Pick the right landlord or mark “not found”
  const [landlordData, setLandlordData] = useState<Landlord | null>(
    MOCK_LANDLORDS[landlordId] ?? null
  );
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [participantName, setParticipantName] = useState('');
  const [messages, setMessages] = useState([]); // if you have chat in this page
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!landlordData) return;
    // reset review form if you want
    setShowReviewForm(false);
  }, [landlordId, landlordData]);

  const handleBack = () => navigate(-1);
  const handleWriteReview = () => setShowReviewForm(true);

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!user) throw new Error('You must be signed in to leave a review!');
    const newReview: Review = {
      id: `r${landlordData!.reviews.length + 1}`,
      userId: user.id,
      userName: user.email,
      userImage: user.picture || '',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedReviews = [newReview, ...landlordData!.reviews];
    const avg = updatedReviews.reduce((s, r) => s + r.rating, 0) / updatedReviews.length;
    setLandlordData({
      ...landlordData!,
      reviews: updatedReviews,
      rating: parseFloat(avg.toFixed(1))
    });
    setShowReviewForm(false);
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => {
          const cls = i < full ? 'full' : (i === full && half ? 'half' : 'empty');
          return <span key={i} className={`star ${cls}`}>{i < full || (i === full && half) ? '★' : '☆'}</span>;
        })}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (landlordData === null) {
    return <div className="landlord-profile-page"><h2>Landlord not found</h2></div>;
  }

  return (
    <div className="landlord-profile-page">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={landlordData.profileImage} alt={landlordData.name} className="profile-image"/>
        </div>
        <div className="profile-info">
          <h1 className="landlord-name">{landlordData.name}</h1>
          <div className="rating-section">
            {renderStars(landlordData.rating)}
            <span className="review-count">({landlordData.reviews.length} reviews)</span>
          </div>
          <div className="profile-details">
            <div className="detail-item"><span className="detail-label">Email:</span> <span className="detail-value">{landlordData.email}</span></div>
            <div className="detail-item"><span className="detail-label">Phone:</span> <span className="detail-value">{landlordData.phone}</span></div>
            <div className="detail-item"><span className="detail-label">Member since:</span> <span className="detail-value">{new Date(landlordData.memberSince).toLocaleDateString()}</span></div>
            <div className="detail-item"><span className="detail-label">Response rate:</span> <span className="detail-value">{landlordData.responseRate}%</span></div>
          </div>
          <button className="write-review-button" onClick={handleWriteReview}>Write a Review</button>
        </div>
      </div>

      <div className="profile-bio">
        <h2>About {landlordData.name}</h2>
        <p>{landlordData.bio}</p>
      </div>

      <div className="properties-section">
        <h2>Properties ({landlordData.properties.length})</h2>
        <div className="property-cards">
          {landlordData.properties.map(p => (
            <div key={p.id} className="property-card" onClick={() => navigate(`/listings/${p.id}`)}>
              <img src={p.image} alt={p.address} className="property-image" />
              <div className="property-info">
                <h3>{p.address}</h3>
                <div className="property-details">
                  <span>{p.beds} bed{p.beds>1 && 's'}</span> • <span>{p.baths} bath{p.baths>1 && 's'}</span>
                </div>
                <div className="property-price">${p.price}/month</div>
              </div>
            </div>
          ))}
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
              <button className="write-review-button mobile" onClick={handleWriteReview}>Write a Review</button>
            </div>
            <div className="reviews-list">
              {landlordData.reviews.map(r => (
                <div key={r.id} className="review-card">
                  <div className="review-header">
                    <img src={r.userImage} alt={r.userName} className="reviewer-image"/>
                    <div className="reviewer-info">
                      <h3>{r.userName}</h3>
                      <div className="review-rating">{renderStars(r.rating)}</div>
                      <div className="review-date">{new Date(r.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="review-comment">{r.comment}</div>
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
