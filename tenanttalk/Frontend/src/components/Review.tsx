import React, { useState } from 'react';
import '../styles/ReviewForm.css';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleMouseOver = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleRatingClick = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      setError('Please provide a review comment');
      return;
    }
    
    onSubmit(rating, comment);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="rating-input">
        <div className="rating-label">Rate your experience:</div>
        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${(hoverRating || rating) >= star ? 'active' : ''}`}
              onClick={() => handleRatingClick(star)}
              onMouseOver={() => handleMouseOver(star)}
              onMouseLeave={handleMouseLeave}
            >
              {(hoverRating || rating) >= star ? '★' : '☆'}
            </span>
          ))}
          {rating > 0 && (
            <span className="rating-text">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          )}
        </div>
      </div>
      
      <div className="comment-input">
        <label htmlFor="review-comment">Write your review:</label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Share your experience with this landlord..."
          rows={5}
        ></textarea>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-actions">
        <button 
          type="button" 
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="submit-button"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;