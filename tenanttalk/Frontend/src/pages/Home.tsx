import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';

const Home = () => {
  // Local states for search fields
  const [propertyType, setPropertyType] = useState('All Types');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000);

  // Additional filters
  const [timeFrame, setTimeFrame] = useState('All');
  const [petFriendly, setPetFriendly] = useState('All');    // 'All' | 'Yes' | 'No'
  const [utilitiesIncluded, setUtilitiesIncluded] = useState('All'); // 'All' | 'Yes' | 'No'
  const [rooms, setRooms] = useState('All');                // 'All' | '1' | '2' | '3' etc.
  const [suitemates, setSuitemates] = useState('All');
  const [roomType, setRoomType] = useState('All');          // 'All' | 'Single' | 'Double' | 'Other'
  const [bathrooms, setBathrooms] = useState('All');        // 'All' | '1' | '2' | '3' etc.

  const navigate = useNavigate();

  // Build query string from the search fields and navigate to /properties
  function handleSearch() {
    const params = new URLSearchParams({
      propertyType,
      location,
      maxPrice: maxPrice.toString(),

      // Additional filters
      timeFrame,
      petFriendly,
      utilitiesIncluded,
      rooms,
      suitemates,
      roomType,
      bathrooms,
    });
    navigate(`/properties?${params.toString()}`);
  }

  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Journey To Your Perfect Home</h1>
          <p>Find your dream rental property and landlord</p>

          <div className="search-container">
            <div className="search-form">
              {/* FIRST ROW (existing search fields) */}
              <div className="search-row">
                {/* Property Type */}
                <div className="search-field">
                  <label>Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option>All Types</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Condo</option>
                  </select>
                </div>

                {/* Location */}
                <div className="search-field">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Max Price Slider */}
                <div className="search-field">
                  <label>
                    Max Price: <strong>${maxPrice}</strong>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                </div>

                {/* Search Button */}
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
              </div>

              {/* SECOND ROW (new filters row #1) */}
              <div className="search-row">
                {/* Sublease Period */}
                <div className="search-field">
                  <label>Sublease Period</label>
                  <select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="January - June">January - June</option>
                    <option value="May - August">May - August</option>
                    <option value="August - December">August - December</option>
                  </select>
                </div>

                {/* Pet Friendly */}
                <div className="search-field">
                  <label>Pet Friendly</label>
                  <select
                    value={petFriendly}
                    onChange={(e) => setPetFriendly(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Utilities Included */}
                <div className="search-field">
                  <label>Utilities Included</label>
                  <select
                    value={utilitiesIncluded}
                    onChange={(e) => setUtilitiesIncluded(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Number of Rooms (Property) */}
                <div className="search-field">
                  <label>Rooms (Property)</label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              {/* THIRD ROW (new filters row #2) */}
              <div className="search-row">
                {/* Number of Suitemates */}
                <div className="search-field">
                  <label>Suitemates</label>
                  <select
                    value={suitemates}
                    onChange={(e) => setSuitemates(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                {/* Room Type */}
                <div className="search-field">
                  <label>Room Type</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div className="search-field">
                  <label>Bathrooms</label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Advisors Section */}
      <section className="advisors-section">
        <div className="section-container">
          <div className="advisors-content">
            <h2>Your Trusted Landlord Advisors</h2>

            <div className="stats-container">
              <div className="stat-card">
                <h3>17K+</h3>
                <p>Satisfied Customers</p>
              </div>

              <div className="stat-card dark">
                <h3>25+</h3>
                <p>Years of Experience</p>
              </div>

              <div className="stat-card">
                <h3>150+</h3>
                <p>Award-Winning</p>
              </div>

              <div className="stat-card">
                <h3>25+</h3>
                <p>Property Collections</p>
              </div>
            </div>
          </div>

          <div className="advisor-description">
            <p>
              A cutting-edge marketplace app that offers a seamless platform for finding the perfect rental property near your dream college.
            </p>
            <div className="feature-box">
              <p>
                <span className="highlight">We have refined the</span> ever-evolving landscape of college housing, prioritizing transparency and focused intensely on a stress-free tenant search experience.
              </p>
            </div>
            <div className="cta-circle">
              <span>→</span>
            </div>
          </div>
        </div>
      </section>

      {/* Property Match Section */}
      <section className="property-match-section">
        <div className="section-container">
          <h2>Discover Your Perfect Property Match</h2>
          <p className="section-description">
            Embark on a journey of discovery through beautiful properties. Various categories, curated to fulfill your specific housing needs.
          </p>

          <div className="property-grid">
            <div className="property-card large">
              <div
                className="property-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}
              >
                <button className="save-button">♡</button>
              </div>
              <div className="property-details">
                <h3 className="property-price">$1,200,000</h3>
                <p className="property-address">321 College St, Apt 4B</p>
                <div className="property-stats">
                  <span>4 bd</span>
                  <span>3 ba</span>
                  <span>2,540 sqft</span>
                </div>
                <div className="agent-badge">
                  <span>↗</span>
                </div>
              </div>
            </div>

            <div className="property-card">
              <div
                className="property-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}
              >
                <button className="save-button">♡</button>
              </div>
            </div>

            <div className="property-card">
              <div
                className="property-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}
              >
                <button className="save-button">♡</button>
              </div>
            </div>

            <div className="property-card">
              <div
                className="property-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}
              >
                <button className="save-button">♡</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Network Section */}
      <section className="network-section">
        <div className="section-container">
          <h2>Landlord Property Network</h2>
          <p>Our landlord network spans to the most college campuses in the US</p>

          <div className="world-map">
            <div className="map-dot germany">
              <div className="country-popup">
                <img src="https://via.placeholder.com/50x50" alt="Location Dot" />
                <div>
                  <h4>Troy, NY</h4>
                  <p>RPI Housing</p>
                </div>
              </div>
            </div>
            {/* More dots would be added for other locations */}
          </div>
        </div>
      </section>

      {/* Trends Section */}
      <section className="trends-section">
        <div className="section-container">
          <h2>Uncover The Latest Trends And Stories</h2>
          <p className="section-description">
            Stay informed and updated with the latest trends, home improvement ideas, and our insights on the property market.
          </p>

          <div className="blog-grid">
            <div className="blog-card">
              <div
                className="blog-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}
              >
                <span className="blog-category">Design Trend</span>
                <button className="save-button">♡</button>
              </div>
              <div className="blog-content">
                <h3>The Growing Demand for Eco-friendly Student Housing</h3>
                <p>Discover the latest in sustainable campus living...</p>
              </div>
            </div>

            <div className="blog-card">
              <div
                className="blog-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}
              ></div>
            </div>

            <div className="blog-card">
              <div
                className="blog-image"
                style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2>Don't Trust Us, Trust Their Voice</h2>
          <p className="section-description">
            Discover heartfelt accounts of our past renters and what they say on our valued hosts's timely and reliable responses.
          </p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="Rachel Heart"
                  className="testimonial-avatar"
                />
                <div>
                  <h4>Rachel Heart</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                "Choosing this app saved me so much time in my rental search! I was instantly connected with verified landlords and appreciated their professionalism and expertise. Highly recommended!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="Lucas Rodrigo"
                  className="testimonial-avatar"
                />
                <div>
                  <h4>Lucas Rodrigo</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                "I had a tight timeline to find a place near campus. This service helped me secure a grand rental in no time. I would definitely use it again!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="Amanda Baldwin"
                  className="testimonial-avatar"
                />
                <div>
                  <h4>Amanda Baldwin</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                "They patiently answered all our questions, provided valuable market insights, and helped us secure our dream home within our budget."
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="Harry Jacobs"
                  className="testimonial-avatar"
                />
                <div>
                  <h4>Harry Jacobs</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                "They presented us with a stunning selection of homes that perfectly matched our criteria, thanks to their detail-oriented approach and in-depth knowledge of the local market truly impressed us."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Ready To Work With Us?</h2>
          <p>Experience top-notch customer service and let us guide you on your property journey.</p>

          <button className="cta-button">
            Learn More <span>→</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
