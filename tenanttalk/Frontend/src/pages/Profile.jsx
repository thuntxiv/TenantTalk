import React, { useState } from 'react';
import '../styles/Profile.css';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';

const Profile = () => {
  // Mock user data - in a real app this would come from your API/state management
  const [user, setUser] = useState({
    name: 'Jessica Chen',
    email: 'jessica.chen@university.edu',
    phone: '(555) 123-4567',
    role: 'Tenant',
    university: 'State University',
    major: 'Computer Science',
    graduationYear: '2026',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Hi! I\'m a junior CS major looking for a quiet apartment close to campus. I enjoy studying at coffee shops and hiking on weekends.',
    preferences: {
      rentRange: '$800-1000',
      moveInDate: '2025-08-01',
      leaseLength: '12 months',
      roommates: 'Yes, 1-2',
      petFriendly: 'Yes',
      furnished: 'Preferred',
      utilities: 'Included preferred',
      parking: 'Need 1 spot',
      location: 'Within 2 miles of campus'
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editedUser);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      preferences: {
        ...editedUser.preferences,
        [name]: value
      }
    });
  };

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <img src={user.avatar} alt="Profile" className="profile-avatar" />
            {isEditing && (
              <button className="update-avatar-btn">Update Photo</button>
            )}
          </div>
          
          <div className="profile-title-section">
            <h1>{user.name}</h1>
            <span className="profile-role">{user.role} • {user.university}</span>
            
            <div className="profile-actions">
              <button 
                className="edit-profile-btn"
                onClick={handleEditToggle}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`profile-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Housing Preferences
          </button>
          <button 
            className={`profile-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`profile-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
        </div>
        
        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-info">
              <div className="profile-section">
                <h2>About Me</h2>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleChange}
                    className="edit-bio"
                  />
                ) : (
                  <p>{user.bio}</p>
                )}
              </div>
              
              <div className="profile-section">
                <h2>Contact Information</h2>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="detail-value">{user.email}</span>
                    )}
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedUser.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="detail-value">{user.phone}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h2>Education</h2>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-label">University</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="university"
                        value={editedUser.university}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="detail-value">{user.university}</span>
                    )}
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Major</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="major"
                        value={editedUser.major}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="detail-value">{user.major}</span>
                    )}
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Graduation Year</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="graduationYear"
                        value={editedUser.graduationYear}
                        onChange={handleChange}
                      />
                    ) : (
                      <span className="detail-value">{user.graduationYear}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <div className="profile-preferences">
              <div className="profile-section">
                <h2>Housing Preferences</h2>
                <div className="preferences-grid">
                  <div className="preference-item">
                    <span className="preference-label">Rent Range</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="rentRange"
                        value={editedUser.preferences.rentRange}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{user.preferences.rentRange}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Move-in Date</span>
                    {isEditing ? (
                      <input
                        type="date"
                        name="moveInDate"
                        value={editedUser.preferences.moveInDate}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">
                        {new Date(user.preferences.moveInDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Lease Length</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="leaseLength"
                        value={editedUser.preferences.leaseLength}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{user.preferences.leaseLength}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Roommates</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="roommates"
                        value={editedUser.preferences.roommates}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{user.preferences.roommates}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Pet Friendly</span>
                    {isEditing ? (
                      <select
                        name="petFriendly"
                        value={editedUser.preferences.petFriendly}
                        onChange={handlePreferenceChange}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="No Preference">No Preference</option>
                      </select>
                    ) : (
                      <span className="preference-value">{user.preferences.petFriendly}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Furnished</span>
                    {isEditing ? (
                      <select
                        name="furnished"
                        value={editedUser.preferences.furnished}
                        onChange={handlePreferenceChange}
                      >
                        <option value="Yes">Yes</option>
                        <option value="Preferred">Preferred</option>
                        <option value="No Preference">No Preference</option>
                        <option value="No">No</option>
                      </select>
                    ) : (
                      <span className="preference-value">{user.preferences.furnished}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Utilities</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="utilities"
                        value={editedUser.preferences.utilities}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{user.preferences.utilities}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Parking</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="parking"
                        value={editedUser.preferences.parking}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{user.preferences.parking}</span>
                    )}
                  </div>
                  
                  <div className="preference-item wide">
                    <span className="preference-label">Location</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={editedUser.preferences.location}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{user.preferences.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="profile-reviews">
              <div className="profile-section">
                <h2>My Reviews</h2>
                <p className="no-content">You haven't submitted any reviews yet.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="profile-messages">
              <div className="profile-section">
                <h2>My Messages</h2>
                <p className="no-content">You have no messages yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;