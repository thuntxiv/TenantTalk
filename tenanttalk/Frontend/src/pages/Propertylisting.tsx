import React, { useState } from 'react';
import '../styles/Propertylisting.css';

interface Listing {
    id: number;
    title: string;
    price: number;
    location: string;
    description: string;
    imageUrl: string;
    timeFrame: string; // NEW property for sublease time
}

const mockListings: Listing[] = [
    {
        id: 1,
        title: 'Studio',
        price: 650,
        location: 'RPI',
        description: 'A cozy studio in midtown Troy.',
        imageUrl: 'https://via.placeholder.com/300x200?text=Cozy+Studio',
        timeFrame: 'August - December',
    },
    {
        id: 2,
        title: 'Loft',
        price: 1000,
        location: 'RPI',
        description: 'A modern loft near the river.',
        imageUrl: 'https://via.placeholder.com/300x200?text=Modern+Loft',
        timeFrame: 'May - August',
    },
    {
        id: 3,
        title: 'Studio',
        price: 550,
        location: 'HVCC',
        description: 'A large townhouse on 12th Street.',
        imageUrl: 'https://via.placeholder.com/300x200?text=Townhouse',
        timeFrame: 'January - June',
    },
];

export default function Propertylisting() {
    // State to store listings and filters
    const [listings, setListings] = useState<Listing[]>(mockListings);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');

    // Filter & search logic
    const filteredListings = listings.filter((listing) => {
        const matchesLocation =
            locationFilter === 'All' || listing.location === locationFilter;
        const matchesSearch = listing.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesLocation && matchesSearch;
    });

    return (
        <div className="property-listings">
            <h1>Current Sublistings</h1>

            {/* Search & Filter Controls */}
            <div className="filter-controls">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                >
                    <option value="All">School</option>
                    <option value="RPI">RPI</option>
                    <option value="RPI">RPI</option>
                    <option value="HVCC">HVCC</option>
                    {/* Add more locations as needed */}
                </select>
            </div>

            <div className="listings-grid">
                {filteredListings.map((listing) => (
                    <div className="listing-card" key={listing.id}>
                        <img src={listing.imageUrl} alt={listing.title} />
                        <h2>{listing.title}</h2>
                        <p>
                            <strong>Location:</strong> {listing.location}
                        </p>
                        <p>
                            <strong>Price:</strong> ${listing.price}
                        </p>
                        <p>{listing.description}</p>
                        <p>
                            <strong>Sublease Period:</strong> {listing.timeFrame}
                        </p>
                    </div>
                ))}
            </div>

            {/* TIMELINE SECTION */}
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
        </div>
    );
}
