import React from 'react';
import '../styles/home.css';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Journey To Your Perfect Home</h1>
          <p>Find your dream rental property and landlord</p>
          
          <div className="search-container">
            <div className="search-tabs">
              <button className="tab active">Buy</button>
              <button className="tab">Rent</button>
              <button className="tab">Sell</button>
            </div>
            
            <div className="search-form">
              <div className="search-row">
                <div className="search-field">
                  <label>Property Type</label>
                  <select>
                    <option>All Types</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Condo</option>
                  </select>
                </div>
                
                <div className="search-field">
                  <label>Location</label>
                  <input type="text" placeholder="Enter location" />
                </div>
                
                <div className="search-field">
                  <label>Price Range</label>
                  <select>
                    <option>Any Price</option>
                    <option>$500 - $1000</option>
                    <option>$1000 - $1500</option>
                    <option>$1500+</option>
                  </select>
                </div>
                
                <button className="search-button">Search</button>
              </div>
              
              <div className="popular-searches">
                <span>Popular Searches:</span>
                <a href="#">Downtown</a>
                <a href="#">College Area</a>
                <a href="#">Furnished</a>
                <a href="#">Pet Friendly</a>
                <a href="#">Utilities Included</a>
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
            <p>A cutting-edge marketplace app that offers a seamless platform for finding the perfect rental property near your dream college.</p>
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
              <div className="property-image" style={{ backgroundImage: "url('https://via.placeholder.com/600x400')" }}>
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
              <div className="property-image" style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}>
                <button className="save-button">♡</button>
              </div>
            </div>
            
            <div className="property-card">
              <div className="property-image" style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}>
                <button className="save-button">♡</button>
              </div>
            </div>
            
            <div className="property-card">
              <div className="property-image" style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}>
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
                <img src={Map} alt="German flag" />
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
              <div className="blog-image" style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}>
                <span className="blog-category">Design Trend</span>
                <button className="save-button">♡</button>
              </div>
              <div className="blog-content">
                <h3>The Growing Demand for Eco-friendly Student Housing</h3>
                <p>Discover the latest in sustainable campus living...</p>
              </div>
            </div>
            
            <div className="blog-card">
              <div className="blog-image" style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}></div>
            </div>
            
            <div className="blog-card">
              <div className="blog-image" style={{ backgroundImage: "url('https://via.placeholder.com/400x300')" }}></div>
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
                <img src="https://via.placeholder.com/50x50" alt="Rachel Heart" className="testimonial-avatar" />
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
                <img src="https://via.placeholder.com/50x50" alt="Lucas Rodrigo" className="testimonial-avatar" />
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
                <img src="https://via.placeholder.com/50x50" alt="Amanda Baldwin" className="testimonial-avatar" />
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
                <img src="https://via.placeholder.com/50x50" alt="Harry Jacobs" className="testimonial-avatar" />
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