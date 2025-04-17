import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import { Link } from 'react-router-dom';

const studioImage = require('../imgs/Studio_listing_1.jpeg');
const loftImage = require('../imgs/Loft_Example.jpg');

interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  address: string;
  school: string;
  petFriendly: boolean;
  rooms: number;
  utilitiesIncluded: boolean;
  description: string;
  imageUrl: string;
  timeFrame: string;
  numberOfSuitemates: number;
  roomType: string;
  bathrooms: number;
}

const Home: React.FC = () => {
  // Local states for search fields
  const [propertyType, setPropertyType] = useState('All Types');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [timeFrame, setTimeFrame] = useState('All');
  const [petFriendly, setPetFriendly] = useState('All');
  const [utilitiesIncluded, setUtilitiesIncluded] = useState('All');
  const [rooms, setRooms] = useState('All');
  const [suitemates, setSuitemates] = useState('All');
  const [roomType, setRoomType] = useState('All');
  const [bathrooms, setBathrooms] = useState('All');

  const navigate = useNavigate();

  // Mock property data
  const mockListings: Listing[] = [
    {
      id: 1,
      title: 'Studio Apartment',
      price: 650,
      location: 'RPI',
      address: '123 4th Street, Troy, NY',
      school: 'RPI',
      petFriendly: true,
      rooms: 1,
      utilitiesIncluded: false,
      description: 'A cozy studio near RPI. Perfect for one person. Pets allowed!',
      imageUrl: studioImage,
      timeFrame: 'August - December',
      numberOfSuitemates: 1,
      roomType: 'Single',
      bathrooms: 1,
    },
    {
      id: 2,
      title: 'Modern Loft',
      price: 1000,
      location: 'RPI',
      address: '456 River Street, Troy, NY',
      school: 'RPI',
      petFriendly: false,
      rooms: 2,
      utilitiesIncluded: true,
      description: 'A modern loft near the river. Spacious living area with utilities included.',
      imageUrl: loftImage,
      timeFrame: 'May - August',
      numberOfSuitemates: 2,
      roomType: 'Double',
      bathrooms: 2,
    },
    {
      id: 3,
      title: 'Townhouse',
      price: 550,
      location: 'HVCC',
      address: '789 12th Street, Troy, NY',
      school: 'HVCC',
      petFriendly: true,
      rooms: 3,
      utilitiesIncluded: false,
      description: 'A large townhouse on 12th Street, close to HVCC. Shared living space, pet-friendly.',
      imageUrl: studioImage,
      timeFrame: 'January - June',
      numberOfSuitemates: 3,
      roomType: 'Other',
      bathrooms: 1,
    },
  ];

  // Build query string from the search fields and navigate to /properties
  function handleSearch() {
    const params = new URLSearchParams({
      propertyType,
      location,
      maxPrice: maxPrice.toString(),
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
              <div className="search-row">
                {/* Property Name */}
                <div className="search-field">
                  <label>Name Of Property</label>
                  <input
                    type="text"
                    placeholder="Enter Property Name"
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

                {/* Number of Rooms */}
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
            <button className="cta-circle" onClick={() => navigate('/about')}>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========== Property Match Section ========== */}
      <section className="property-match-section">
        <div className="section-container">
          <h2>Discover Your Perfect Property Match</h2>
          <p className="section-description">
            Embark on a journey of discovery through beautiful properties.
          </p>

          <div className="property-grid">
            {mockListings.map((listing, idx) => (
              <Link
                key={listing.id}
                to={`/listings/${listing.id}`}
                className={`property-card ${idx === 0 ? 'large' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {/* Image */}
                <div
                  className="property-image"
                  style={{ backgroundImage: `url(${listing.imageUrl})` }}
                />

                {/* Details */}
                <div className="property-details">
                  {/* Title */}
                  <h3 className="property-title">{listing.title}</h3>

                  {/* Price now on its own line */}
                  <p className="property-price">${listing.price}/mo</p>

                  {/* Address */}
                  <p className="property-address">{listing.address}</p>

                  {/* Description */}
                  <p className="property-description">
                    {listing.description}
                  </p>

                  {/* Stats */}
                  <div className="property-stats">
                    <span>{listing.rooms} bd</span>
                    <span>{listing.bathrooms} ba</span>
                    <span>
                      {listing.numberOfSuitemates}{' '}
                      {listing.numberOfSuitemates > 1
                        ? 'suitemates'
                        : 'suitemate'}
                    </span>
                    <span>
                      {listing.petFriendly ? 'Pet Friendly' : 'No Pets'}
                    </span>
                    <span>
                      {listing.utilitiesIncluded
                        ? 'Utilities Included'
                        : 'Utilities Not Included'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

          
          </div>
        </div>
      </section>
      {/* ============================================ */}


      {/* ========== Testimonials Section ========== */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2>Don't Trust Us, Trust Their Voice</h2>
          <p className="section-description">
            Discover heartfelt accounts of our past renters and what they say about our hosts’ timely, reliable responses.
          </p>

          <div className="testimonials-grid">
            {[
              {
                name: 'Rachel Heart',
                quote:
                  'Choosing this app saved me so much time in my rental search! I was instantly connected with verified landlords and appreciated their professionalism and expertise. Highly recommended!',
              },
              {
                name: 'Lucas Rodrigo',
                quote:
                  'I had a tight timeline to find a place near campus. This service helped me secure a great rental in no time. I would definitely use it again!',
              },
              {
                name: 'Amanda Baldwin',
                quote:
                  'They patiently answered all our questions, provided valuable market insights, and helped us secure our dream home within our budget.',
              },
              {
                name: 'Harry Jacobs',
                quote:
                  'They presented us with a stunning selection of homes that perfectly matched our criteria; their detail‑oriented approach and in‑depth knowledge of the local market truly impressed us.',
              },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <h4 className="testimonial-name">{t.name}</h4>
                <div className="testimonial-stars">
                  {/* ★★★★★ */}
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* =========================================== */}


      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Ready To Work With Us?</h2>
          <p>Experience top-notch customer service and let us guide you on your property journey.</p>
          <button className="cta-button" onClick={() => navigate('/about')}>
            Learn More <span>→</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
