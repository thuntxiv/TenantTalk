import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from '../components/Review.tsx';
import '../styles/LandlordProfile.css';
import { useAuth } from '../components/AuthContext.tsx';

const LandlordProfilePage: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    // Mock data directly in the component
    const landlord = {
      id: '1',
      name: 'John Smith',
      profileImage: 'https://via.placeholder.com/300',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      bio: 'Property manager with over 10 years of experience managing college town apartments. I take pride in maintaining quality housing for students and young professionals.',
      memberSince: '2018-05-12',
      responseRate: 95,
      rating: 4.7,
      properties: [
        {
          id: 'p1',
          address: '123 College St, Apt 4B',
          image: 'https://via.placeholder.com/400x300',
          beds: 2,
          baths: 1,
          price: 1200
        },
        {
          id: 'p2',
          address: '456 University Ave',
          image: 'https://via.placeholder.com/400x300',
          beds: 3,
          baths: 2,
          price: 1600
        },
        {
          id: 'p3',
          address: '789 Campus Blvd',
          image: 'https://via.placeholder.com/400x300',
          beds: 1,
          baths: 1,
          price: 900
        }
      ],
      reviews: [
        {
          id: 'r1',
          userId: 'u1',
          userName: 'Alex Johnson',
          userImage: 'https://via.placeholder.com/50',
          rating: 5,
          comment: 'John was an excellent landlord! Very responsive to maintenance requests and always fair with the deposit return.',
          date: '2023-12-15'
        },
        {
          id: 'r2',
          userId: 'u2',
          userName: 'Maria Garcia',
          userImage: 'https://via.placeholder.com/50',
          rating: 4,
          comment: 'Overall a good experience. The property was well-maintained, though sometimes it took a few days to get a response to emails.',
          date: '2023-10-28'
        },
        {
          id: 'r3',
          userId: 'u3',
          userName: 'James Wilson',
          userImage: 'https://via.placeholder.com/50',
          rating: 5,
          comment: 'One of the best landlords I\'ve had. Prompt with repairs and very understanding during the pandemic.',
          date: '2023-08-05'
        }
      ]
    };
    
    const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
    const [landlordData, setLandlordData] = useState(landlord);
    const navigate = useNavigate();
  
    const handleBack = () => {
      navigate(-1);
    };
  
    const handleWriteReview = () => {
      setShowReviewForm(true);
    };
  
    const handleReviewSubmit = (rating: number, comment: string) => {
     if(user){
      const newReview = {
        id: `r${landlordData.reviews.length + 1}`,
        userId: 'current-user-id',
        userName: user.email,
        userImage: user.picture || user.imageUrl,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      const updatedReviews = [newReview, ...landlordData.reviews];
      
      const totalRatings = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
      const newAvgRating = totalRatings / updatedReviews.length;
      
      setLandlordData({
        ...landlordData,
        reviews: updatedReviews,
        rating: parseFloat(newAvgRating.toFixed(1))
      });
      
      setShowReviewForm(false);
     }
     else{
        throw new Error('You must be signed in to leave a review!');
     }
    };
  
    const renderStars = (rating: number) => {
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
        </div>
      );
    };
  
    return (
      <div className="landlord-profile-page">
        <button className="back-button" onClick={handleBack}>
          ← Back to Landlords
        </button>
        
        <div className="profile-header">
          <div className="profile-image-container">
            <img 
              src={landlordData.profileImage} 
              alt={landlordData.name} 
              className="profile-image"
            />
          </div>
          
          <div className="profile-info">
            <h1 className="landlord-name">{landlordData.name}</h1>
            
            <div className="rating-section">
              {renderStars(landlordData.rating)}
              <span className="review-count">
                ({landlordData.reviews.length} {landlordData.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
            
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{landlordData.email}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{landlordData.phone}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Member since:</span>
                <span className="detail-value">{new Date(landlordData.memberSince).toLocaleDateString()}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Response rate:</span>
                <span className="detail-value">{landlordData.responseRate}%</span>
              </div>
            </div>
            
            <a href="#reviews">
            <button 
              className="write-review-button"
              onClick={handleWriteReview}
            >     
              Write a Review
            </button>
            </a>
          </div>
        </div>
        
        <div className="profile-bio">
          <h2>About {landlordData.name}</h2>
          <p>{landlordData.bio}</p>
        </div>
        
        <div className="properties-section">
          <h2>Properties ({landlordData.properties.length})</h2>
          <div className="property-cards">
            {landlordData.properties.map(property => (
              <div key={property.id} className="property-card">
                <img 
                  src={property.image} 
                  alt={property.address} 
                  className="property-image"
                />
                <div className="property-info">
                  <h3 className="property-address">{property.address}</h3>
                  <div className="property-details">
                    <span>{property.beds} {property.beds === 1 ? 'bed' : 'beds'}</span>
                    <span>•</span>
                    <span>{property.baths} {property.baths === 1 ? 'bath' : 'baths'}</span>
                  </div>
                  <div className="property-price">${property.price}/month</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="reviews">
        {showReviewForm ? (
          <div className="review-form-section">
            <h2>Write a Review</h2>
            <ReviewForm 
              onSubmit={handleReviewSubmit} 
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        ) : (
          <div className="reviews-section">
            <div className="reviews-header">
              <h2>Reviews ({landlordData.reviews.length})</h2>
              <button 
                className="write-review-button mobile"
                onClick={handleWriteReview}
              >
                Write a Review
              </button>
            </div>
            
            <div className="reviews-list">
              {landlordData.reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <img 
                      src={review.userImage} 
                      alt={review.userName} 
                      className="reviewer-image"
                    />
                    <div className="reviewer-info">
                      <h3 className="reviewer-name">{review.userName}</h3>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                      <div className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="review-comment">
                    {review.comment}
                  </div>
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