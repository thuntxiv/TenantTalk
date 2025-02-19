import React from 'react';
import { MapPin, Users, Star } from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your Perfect College Housing
            </h1>
            <p className="hero-description">
              Connect with reliable landlords, find compatible roommates, and discover the best properties near your campus.
            </p>
            <div className="button-group">
              <button className="primary-button" onClick={() => window.location.href = '/properties'}>
                Browse Properties
              </button>
              <button className="secondary-button" onClick={() => window.location.href = '/register'}>
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title">Why Choose TenantTalk?</h2>
          <div className="features-grid">
            <FeatureCard 
              icon={<MapPin size={32} />}
              title="Interactive Property Maps"
              description="Explore available properties with our interactive map. Filter by location, price, and landlord ratings to find your ideal home."
            />
            <FeatureCard 
              icon={<Users size={32} />}
              title="Find Compatible Roommates"
              description="Connect with potential roommates based on lifestyle preferences, study habits, and shared interests."
            />
            <FeatureCard 
              icon={<Star size={32} />}
              title="Verified Reviews"
              description="Read authentic reviews from real tenants about properties and landlords to make informed decisions."
            />
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatCard number="1000+" label="Listed Properties" />
            <StatCard number="5000+" label="Active Users" />
            <StatCard number="4.8/5" label="Average Rating" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div>
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export default Home;