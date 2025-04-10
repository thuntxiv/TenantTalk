import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.tsx';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/Profile.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: '',
    phone: '',
    university: '',
    major: '',
    graduationYear: '',
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
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Load user data from localStorage if available
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  // Loading state
  if (isLoading || !user) {
    return <div className="loading-container">Loading...</div>;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profileData));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        [name]: value
      }
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <img 
              src={user.picture || user.imageUrl || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="profile-avatar" 
            />
            {isEditing && (
              <button className="update-avatar-btn">Update Photo</button>
            )}
          </div>
          
          <div className="profile-title-section">
            <h1>{user.name}</h1>
            <span className="profile-email">{user.email}</span>
            
            <div className="profile-actions">
              <button 
                className="edit-profile-btn"
                onClick={handleEditToggle}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
          <div className="logo">
          <a href="/" ><span className="logo-icon">🏠</span>
          <span className="logo-text">TenantTalk</span></a>
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
            className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Properties
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
                    value={profileData.bio}
                    onChange={handleChange}
                    className="edit-bio"
                    placeholder="Tell us a bit about yourself..."
                  />
                ) : (
                  <p>{profileData.bio || 'No bio provided yet. Click Edit Profile to add your bio.'}</p>
                )}
              </div>
              
              <div className="profile-section">
                <h2>Contact Information</h2>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user.email}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />
                    ) : (
                      <span className="detail-value">
                        {profileData.phone || 'No phone number provided.'}
                      </span>
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
                        value={profileData.university}
                        onChange={handleChange}
                        placeholder="Your university"
                      />
                    ) : (
                      <span className="detail-value">
                        {profileData.university || 'Not specified'}
                      </span>
                    )}
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Major</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="major"
                        value={profileData.major}
                        onChange={handleChange}
                        placeholder="Your major"
                      />
                    ) : (
                      <span className="detail-value">
                        {profileData.major || 'Not specified'}
                      </span>
                    )}
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Graduation Year</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="graduationYear"
                        value={profileData.graduationYear}
                        onChange={handleChange}
                        placeholder="Expected graduation year"
                      />
                    ) : (
                      <span className="detail-value">
                        {profileData.graduationYear || 'Not specified'}
                      </span>
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
                        value={profileData.preferences.rentRange}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{profileData.preferences.rentRange}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Move-in Date</span>
                    {isEditing ? (
                      <input
                        type="date"
                        name="moveInDate"
                        value={profileData.preferences.moveInDate}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">
                        {new Date(profileData.preferences.moveInDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Lease Length</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="leaseLength"
                        value={profileData.preferences.leaseLength}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{profileData.preferences.leaseLength}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Roommates</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="roommates"
                        value={profileData.preferences.roommates}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{profileData.preferences.roommates}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Pet Friendly</span>
                    {isEditing ? (
                      <select
                        name="petFriendly"
                        value={profileData.preferences.petFriendly}
                        onChange={handlePreferenceChange}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="No Preference">No Preference</option>
                      </select>
                    ) : (
                      <span className="preference-value">{profileData.preferences.petFriendly}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Furnished</span>
                    {isEditing ? (
                      <select
                        name="furnished"
                        value={profileData.preferences.furnished}
                        onChange={handlePreferenceChange}
                      >
                        <option value="Yes">Yes</option>
                        <option value="Preferred">Preferred</option>
                        <option value="No Preference">No Preference</option>
                        <option value="No">No</option>
                      </select>
                    ) : (
                      <span className="preference-value">{profileData.preferences.furnished}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Utilities</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="utilities"
                        value={profileData.preferences.utilities}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{profileData.preferences.utilities}</span>
                    )}
                  </div>
                  
                  <div className="preference-item">
                    <span className="preference-label">Parking</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="parking"
                        value={profileData.preferences.parking}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{profileData.preferences.parking}</span>
                    )}
                  </div>
                  
                  <div className="preference-item wide">
                    <span className="preference-label">Location</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={profileData.preferences.location}
                        onChange={handlePreferenceChange}
                      />
                    ) : (
                      <span className="preference-value">{profileData.preferences.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'saved' && (
            <div className="saved-properties">
              <div className="profile-section">
                <h2>Saved Properties</h2>
                <p className="no-content">You haven't saved any properties yet.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="messages">
              <div className="profile-section">
                <h2>Messages</h2>
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