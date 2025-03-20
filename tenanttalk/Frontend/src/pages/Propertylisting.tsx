import React, { useState } from 'react';
import Footer from '../components/footer.tsx';
import '../styles/Propertylisting.css';

const studioImage = require('../imgs/Studio_listing_1.jpeg');
const loftImage = require('../imgs/Loft_Example.jpg');

interface Listing {
    id: number;
    title: string;
    price: number;
    location: string;
    description: string;
    imageUrl: string;
    timeFrame: string;
}

const mockListings: Listing[] = [
    {
        id: 1,
        title: 'Studio',
        price: 650,
        location: 'RPI',
        description: 'A cozy studio in midtown Troy.',
        imageUrl: studioImage,
        timeFrame: 'August - December',
    },
    {
        id: 2,
        title: 'Loft',
        price: 1000,
        location: 'RPI',
        description: 'A modern loft near the river.',
        imageUrl: loftImage,
        timeFrame: 'May - August',
    },
    {
        id: 3,
        title: 'Studio',
        price: 550,
        location: 'HVCC',
        description: 'A large townhouse on 12th Street.',
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

    // NEW: Timeframe filter
    const [timeFrameFilter, setTimeFrameFilter] = useState('All');

    // Filter logic
    const filteredListings = listings.filter((listing) => {
        const matchesLocation =
            locationFilter === 'All' || listing.location === locationFilter;
        const matchesSearch = listing.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesPrice = listing.price <= maxPrice;

        // NEW: Check if listing's timeFrame matches selected timeframe
        const matchesTimeFrame =
            timeFrameFilter === 'All' || listing.timeFrame === timeFrameFilter;

        return (
            matchesLocation &&
            matchesSearch &&
            matchesPrice &&
            matchesTimeFrame
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

                    {/* NEW: Timeline Filter */}
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
                </aside>

                <main className="listings-container">
                    <div className="listings-grid">
                        {filteredListings.map((listing) => (
                            <div className="listing-card" key={listing.id}>
                                <img src={listing.imageUrl} alt={listing.title} />
                                <h2>{listing.title}</h2>
                                <p><strong>Location:</strong> {listing.location}</p>
                                <p><strong>Price:</strong> ${listing.price}</p>
                                <p>{listing.description}</p>
                                <p><strong>Sublease Period:</strong> {listing.timeFrame}</p>
                            </div>
                        ))}
                    </div>

                    <div className="timeline-container">
                        <h2>Timeline of Sublistings</h2>
                        {filteredListings.map((listing) => (
                            <div className="timeline-item" key={listing.id}>
                                <div className="timeline-date">{listing.timeFrame}</div>
                                <div className="timeline-content">
                                    <strong>{listing.title}</strong>
                                    <span> – {listing.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}


