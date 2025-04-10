import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
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
    numberOfSuitemates: number;
    roomType: 'Single' | 'Double' | 'Other';
    bathrooms: number;
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

export default function Propertylisting() {
    // 1. Parse query parameters 
    const [searchParams] = useSearchParams();
    const paramLocation = searchParams.get('location') || '';
    const queryMaxPrice = searchParams.get('maxPrice') || '2000';

    // 2. Local filter states
    const [listings] = useState<Listing[]>(mockListings);
    const [searchTerm, setSearchTerm] = useState(paramLocation);
    const [locationFilter, setLocationFilter] = useState('All');
    const [maxPrice, setMaxPrice] = useState(() => parseInt(queryMaxPrice));
    const [timeFrameFilter, setTimeFrameFilter] = useState('All');

    // Existing filters
    const [petFriendlyFilter, setPetFriendlyFilter] = useState('All'); 
    const [utilitiesFilter, setUtilitiesFilter] = useState('All');     
    const [roomsFilter, setRoomsFilter] = useState('All');            
    const [suitematesFilter, setSuitematesFilter] = useState('All');

    // New filters for the room being rented
    const [roomTypeFilter, setRoomTypeFilter] = useState('All'); 
    const [bathroomsFilter, setBathroomsFilter] = useState('All'); 

    const navigate = useNavigate();

    function handleListingClick(listingId: number) {
        navigate(`/listings/${listingId}`);
    }

    // 3. Filter logic
    const filteredListings = listings.filter((listing) => {
        const matchesSearch =
            !searchTerm ||
            listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation =
            locationFilter === 'All' || listing.location === locationFilter;

        const matchesPrice = listing.price <= maxPrice;

        const matchesTimeFrame =
            timeFrameFilter === 'All' || listing.timeFrame === timeFrameFilter;

        const matchesPetFriendly =
            petFriendlyFilter === 'All' ||
            (petFriendlyFilter === 'Yes' && listing.petFriendly) ||
            (petFriendlyFilter === 'No' && !listing.petFriendly);

        const matchesUtilities =
            utilitiesFilter === 'All' ||
            (utilitiesFilter === 'Yes' && listing.utilitiesIncluded) ||
            (utilitiesFilter === 'No' && !listing.utilitiesIncluded);

        const matchesRooms =
            roomsFilter === 'All' || listing.rooms === parseInt(roomsFilter);

        const matchesSuitemates =
            suitematesFilter === 'All' ||
            listing.numberOfSuitemates === parseInt(suitematesFilter);

        // New matching for room details (room type and bathrooms)
        const matchesRoomType =
            roomTypeFilter === 'All' || listing.roomType === roomTypeFilter;

        const matchesBathrooms =
            bathroomsFilter === 'All' || listing.bathrooms === parseInt(bathroomsFilter);

        return (
            matchesSearch &&
            matchesLocation &&
            matchesPrice &&
            matchesTimeFrame &&
            matchesPetFriendly &&
            matchesUtilities &&
            matchesRooms &&
            matchesSuitemates &&
            matchesRoomType &&
            matchesBathrooms
        );
    });

    return (
        <div className="property-page">
            <Navbar />
            <header className="page-header">
                <h1 className="page-title">Current Listings</h1>
            </header>

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

                    {/* Sublease Period */}
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

                    {/* Pet Friendly */}
                    <div className="filter-section">
                        <label htmlFor="petFriendlySelect">Pet Friendly</label>
                        <select
                            id="petFriendlySelect"
                            value={petFriendlyFilter}
                            onChange={(e) => setPetFriendlyFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Utilities Included */}
                    <div className="filter-section">
                        <label htmlFor="utilitiesSelect">Utilities Included</label>
                        <select
                            id="utilitiesSelect"
                            value={utilitiesFilter}
                            onChange={(e) => setUtilitiesFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Rooms Filter (Property-wide) */}
                    <div className="filter-section">
                        <label htmlFor="roomsSelect">Number of Rooms (Property)</label>
                        <select
                            id="roomsSelect"
                            value={roomsFilter}
                            onChange={(e) => setRoomsFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    {/* Suitemates Filter */}
                    <div className="filter-section">
                        <label htmlFor="suitematesSelect">Number of Suitemates</label>
                        <select
                            id="suitematesSelect"
                            value={suitematesFilter}
                            onChange={(e) => setSuitematesFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    {/* Room Type Filter */}
                    <div className="filter-section">
                        <label htmlFor="roomTypeSelect">Room Type</label>
                        <select
                            id="roomTypeSelect"
                            value={roomTypeFilter}
                            onChange={(e) => setRoomTypeFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Bathrooms Filter */}
                    <div className="filter-section">
                        <label htmlFor="bathroomsSelect">Bathrooms</label>
                        <select
                            id="bathroomsSelect"
                            value={bathroomsFilter}
                            onChange={(e) => setBathroomsFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
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
                                <p><strong>Property Rooms:</strong> {listing.rooms}</p>
                                <p>
                                    <strong>Utilities Included:</strong>{' '}
                                    {listing.utilitiesIncluded ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Number of Suitemates:</strong> {listing.numberOfSuitemates}
                                </p>
                                <p>
                                    <strong>Room Type:</strong> {listing.roomType}
                                </p>
                                <p>
                                    <strong>Bathrooms:</strong> {listing.bathrooms}
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
