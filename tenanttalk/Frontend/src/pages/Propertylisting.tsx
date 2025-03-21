import React, { useState } from 'react';
import Footer from '../components/footer.tsx';
import '../styles/Propertylisting.css';

const studioImage = require('../imgs/Studio_listing_1.jpeg');
const loftImage = require('../imgs/Loft_Example.jpg');

interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;         // Used for filtering (RPI, HVCC, etc.)
  address: string;          // Actual Troy address
  school: string;           // "RPI", "HVCC", or "Sage"
  petFriendly: boolean;     // true/false
  rooms: number;            // Number of rooms/bedrooms
  utilitiesIncluded: boolean;
  description: string;
  imageUrl: string;
  timeFrame: string;        // Sublease period (for timeline filter)
}

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
    description:
      'A cozy studio near RPI. Perfect for one person. Pets allowed!',
    imageUrl: studioImage,
    timeFrame: 'August - December',
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
    description:
      'A modern loft near the river. Spacious living area with utilities included.',
    imageUrl: loftImage,
    timeFrame: 'May - August',
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
    description:
      'A large townhouse on 12th Street, close to HVCC. Shared living space, pet-friendly.',
    imageUrl: studioImage,
    timeFrame: 'January - June',
  },
];

export default function Propertylisting() {
  const [listings] = useState<Listing[]>(mockListings);

  // Existing filters
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [timeFrameFilter, setTimeFrameFilter] = useState('All');

  // NEW: Additional filters
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);
  const [utilitiesOnly, setUtilitiesOnly] = useState(false);
  const [minRooms, setMinRooms] = useState(0);

  // Filter logic
  const filteredListings = listings.filter((listing) => {
    // Existing conditions
    const matchesLocation =
      locationFilter === 'All' || listing.location === locationFilter;
    const matchesSearch = listing.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice = listing.price <= maxPrice;
    const matchesTimeFrame =
      timeFrameFilter === 'All' || listing.timeFrame === timeFrameFilter;

    // NEW: Additional conditions
    const matchesPet = !petFriendlyOnly || listing.petFriendly;
    const matchesUtilities = !utilitiesOnly || listing.utilitiesIncluded;
    const matchesRooms = listing.rooms >= minRooms;

    return (
      matchesLocation &&
      matchesSearch &&
      matchesPrice &&
      matchesTimeFrame &&
      matchesPet &&
      matchesUtilities &&
      matchesRooms
    );
  });

  return (
    <div className="property-page">
      {/* Header (Logo + Title) */}
      <header className="page-header">
        <div className="page-logo">
          <span role="img" aria-label="logo">🏠</span>
          <span className="logo-text">TenantTalk</span>
        </div>
        <h1 className="page-title">Current Sublistings</h1>
      </header>

      {/* Main Content: Sidebar + Listings */}
      <div className="page-content">
        <aside className="filters-sidebar">
          <h2>Filters</h2>

          {/* Search */}
          <div className="filter-section">
            <label htmlFor="searchInput">Search by Title</label>
            <input
              id="searchInput"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="filter-section">
            <label htmlFor="locationSelect">Location</label>
            <select
              id="locationSelect"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="RPI">RPI</option>
              <option value="HVCC">HVCC</option>
              <option value="Sage">Sage</option>
            </select>
          </div>

          {/* Price Slider */}
          <div className="filter-section">
            <label htmlFor="priceRange">
              Max Price: <strong>${maxPrice}</strong>
            </label>
            <input
              id="priceRange"
              type="range"
              min="0"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </div>

          {/* Timeline Filter */}
          <div className="filter-section">
            <label htmlFor="timeFrameSelect">Sublease Period</label>
            <select
              id="timeFrameSelect"
              value={timeFrameFilter}
              onChange={(e) => setTimeFrameFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="January - June">January - June</option>
              <option value="May - August">May - August</option>
              <option value="August - December">August - December</option>
            </select>
          </div>

          {/* NEW: Pet-Friendly Filter */}
          <div className="filter-section">
            <label htmlFor="petFriendlyCheck">
              <input
                id="petFriendlyCheck"
                type="checkbox"
                checked={petFriendlyOnly}
                onChange={(e) => setPetFriendlyOnly(e.target.checked)}
              />
              Pet Friendly Only
            </label>
          </div>

          {/* NEW: Utilities Filter */}
          <div className="filter-section">
            <label htmlFor="utilitiesCheck">
              <input
                id="utilitiesCheck"
                type="checkbox"
                checked={utilitiesOnly}
                onChange={(e) => setUtilitiesOnly(e.target.checked)}
              />
              Utilities Included Only
            </label>
          </div>

          {/* NEW: Rooms Slider */}
          <div className="filter-section">
            <label htmlFor="roomsRange">
              Min Rooms: <strong>{minRooms}</strong>
            </label>
            <input
              id="roomsRange"
              type="range"
              min="0"
              max="5"
              step="1"
              value={minRooms}
              onChange={(e) => setMinRooms(parseInt(e.target.value))}
            />
          </div>
        </aside>

        <main className="listings-container">
          <div className="listings-grid">
            {filteredListings.map((listing) => (
              <div className="listing-card" key={listing.id}>
                <img src={listing.imageUrl} alt={listing.title} />
                <h2>{listing.title}</h2>
                <p><strong>Address:</strong> {listing.address}</p>
                <p><strong>School:</strong> {listing.school}</p>
                <p>
                  <strong>Pet Friendly:</strong>{' '}
                  {listing.petFriendly ? 'Yes' : 'No'}
                </p>
                <p><strong>Rooms:</strong> {listing.rooms}</p>
                <p>
                  <strong>Utilities Included:</strong>{' '}
                  {listing.utilitiesIncluded ? 'Yes' : 'No'}
                </p>
                <p><strong>Price:</strong> ${listing.price}</p>
                <p><strong>Sublease Period:</strong> {listing.timeFrame}</p>
                <p>{listing.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}


