import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/footer.tsx';
import '../styles/Propertylisting.css';

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
        description: 'A cozy studio near RPI. Perfect for one person. Pets allowed!',
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
    // 1. Read query parameters
    const [searchParams] = useSearchParams();

    // For example, if the user visited: /listings?propertyType=House&location=Troy&priceRange=$500 - $1000
    // we can parse them here:
    const paramLocation = searchParams.get('location') || '';      // from Home page's "Location" field
    const queryMaxPrice = searchParams.get('maxPrice') || '2000';
    const paramPropertyType = searchParams.get('propertyType') || 'All Types';

    // 2. Initialize local filter states with query param values (if any)
    //    We also have existing filters: searchTerm, timeFrameFilter
    const [listings] = useState<Listing[]>(mockListings);

    // For the searchTerm, let's map it to paramLocation for demonstration
    // or you can create a separate param if needed
    const [searchTerm, setSearchTerm] = useState(paramLocation);

    // If your listing has a "type" field, you could store paramPropertyType. Here we have "locationFilter"
    // We'll map "propertyType" param to "locationFilter" for demonstration
    // or rename "locationFilter" to "propertyTypeFilter" if you prefer
    const [locationFilter, setLocationFilter] = useState('All');
    // We do have a location property in each listing, so let's keep "locationFilter" for that
    // But you can adapt as needed. For now, let's keep locationFilter = 'All' or 'RPI' etc.
    // We'll rely on paramLocation in the "searchTerm" for demonstration

    const [maxPrice, setMaxPrice] = useState(() => parseInt(queryMaxPrice));

    const [timeFrameFilter, setTimeFrameFilter] = useState('All');

    const navigate = useNavigate();

    function handleListingClick(listingId: number) {
        navigate(`/listings/${listingId}`);
    }

    // 3. Filter logic (combine local states + param-based logic)
    const filteredListings = listings.filter((listing) => {
        // For demonstration, let's do:
        // - If searchTerm is present, it must match the listing's title or address
        const matchesSearch =
            !searchTerm ||
            listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.address.toLowerCase().includes(searchTerm.toLowerCase());

        // locationFilter (the user can still pick from the sidebar "All", "RPI", etc.)
        const matchesLocation =
            locationFilter === 'All' || listing.location === locationFilter;

        // price
        const matchesPrice = listing.price <= maxPrice;

        // sublease period
        const matchesTimeFrame =
            timeFrameFilter === 'All' || listing.timeFrame === timeFrameFilter;

        return (
            matchesSearch &&
            matchesLocation &&
            matchesPrice &&
            matchesTimeFrame
        );
    });

    return (
        <div className="property-page">
            {/* Header */}
            <header className="page-header">
                <div className="page-logo">
                    <a href='/'><span role="img" aria-label="logo">🏠</span>
                    <span className="logo-text">TenantTalk</span></a>
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
                </aside>

                <main className="listings-container">
                    <div className="listings-grid">
                        {filteredListings.map((listing) => (
                            <div
                                className="listing-card"
                                key={listing.id}
                                onClick={() => handleListingClick(listing.id)}
                                style={{ cursor: 'pointer' }}
                            >
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


