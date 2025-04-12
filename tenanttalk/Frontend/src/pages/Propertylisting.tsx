import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/Propertylisting.css';

const studioImage = require('../imgs/Studio_listing_1.jpeg');
const loftImage = require('../imgs/Loft_Example.jpg');

// Interface for each listing
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

// Mock data, can be deleted later on with fully implemented backend
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
        description:
            'A large townhouse on 12th Street, close to HVCC. Shared living space, pet-friendly.',
        imageUrl: studioImage,
        timeFrame: 'January - June',
        numberOfSuitemates: 3,
        roomType: 'Other',
        bathrooms: 1,
    },
];

// Gathers parameters from user for sorting and filtering
export default function Propertylisting() {
    const [searchParams] = useSearchParams();
    const paramLocation = searchParams.get('location') || '';
    const paramMaxPrice = searchParams.get('maxPrice') || '2000';
    const paramTimeFrame = searchParams.get('timeFrame') || 'All';
    const paramPetFriendly = searchParams.get('petFriendly') || 'All';
    const paramUtilities = searchParams.get('utilitiesIncluded') || 'All';
    const paramRooms = searchParams.get('rooms') || 'All';
    const paramSuitemates = searchParams.get('suitemates') || 'All';
    const paramRoomType = searchParams.get('roomType') || 'All';
    const paramBathrooms = searchParams.get('bathrooms') || 'All';
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [listings, setListings] = useState<Listing[]>(mockListings);
    const [searchTerm, setSearchTerm] = useState(paramLocation);
    const [locationFilter, setLocationFilter] = useState('All');
    const [maxPrice, setMaxPrice] = useState(() => parseInt(paramMaxPrice));
    const [timeFrameFilter, setTimeFrameFilter] = useState(paramTimeFrame);
    const [petFriendlyFilter, setPetFriendlyFilter] = useState(paramPetFriendly); 
    const [utilitiesFilter, setUtilitiesFilter] = useState(paramUtilities);     
    const [roomsFilter, setRoomsFilter] = useState(paramRooms);                 
    const [suitematesFilter, setSuitematesFilter] = useState(paramSuitemates);    
    const [roomTypeFilter, setRoomTypeFilter] = useState(paramRoomType);        
    const [bathroomsFilter, setBathroomsFilter] = useState(paramBathrooms);   

    useEffect(() => {
        const fetchListings = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/properties');
            if (!response.ok) {
              throw new Error('Failed to fetch listings from the API');
            }
            const data = await response.json();
    
            const apiListings: Listing[] = data.map((item: any) => ({
              id: item._id, 
              title: item.title,
              price: item.rent,
              location: item.location,
              address: item.address,
              school: item.location, 
              petFriendly: item.amenities ? item.amenities.includes('pet-friendly') : false,
              rooms: item.bedrooms,
              utilitiesIncluded: item.tags ? item.tags.includes('utilitiesIncluded') : false,
              description: item.description,
              imageUrl:
                item.photoURL && item.photoURL.length > 0
                  ? item.photoURL[0]
                  : studioImage, 
              timeFrame: item.period,
              numberOfSuitemates: 1, 
              roomType: item.roomType,
              bathrooms: item.bathrooms,
            }));
    
            // Insert the API data into the listings state
            setListings(prevListings => [...prevListings, ...apiListings]);
          } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
          } finally {
            setLoading(false);
          }
        };
    
        // Call the async function
        fetchListings();
      }, []);


    const navigate = useNavigate();

    function handleListingClick(listingId: number) {
        navigate(`/listings/${listingId}`);
    }

    // 3. Filter logic - All filters must pass for a listing to be displayed.
    const filteredListings = listings.filter((listing) => {
        // Search by title or address
        const matchesSearch =
            !searchTerm ||
            listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.address.toLowerCase().includes(searchTerm.toLowerCase());

        // Location filter 
        const matchesLocation =
            locationFilter === 'All' || listing.location === locationFilter;

        // Price filter
        const matchesPrice = listing.price <= maxPrice;

        // Sublease Period filter
        const matchesTimeFrame =
            timeFrameFilter === 'All' || listing.timeFrame === timeFrameFilter;

        // Pet Friendly filter
        const matchesPetFriendly =
            petFriendlyFilter === 'All' ||
            (petFriendlyFilter === 'Yes' && listing.petFriendly) ||
            (petFriendlyFilter === 'No' && !listing.petFriendly);

        // Utilities Included filter
        const matchesUtilities =
            utilitiesFilter === 'All' ||
            (utilitiesFilter === 'Yes' && listing.utilitiesIncluded) ||
            (utilitiesFilter === 'No' && !listing.utilitiesIncluded);

        // Number of Rooms in the property filter
        const matchesRooms =
            roomsFilter === 'All' || listing.rooms === parseInt(roomsFilter);

        // Number of Suitemates filter
        const matchesSuitemates =
            suitematesFilter === 'All' || listing.numberOfSuitemates === parseInt(suitematesFilter);

        // Room Type filter (for the room being rented)
        const matchesRoomType =
            roomTypeFilter === 'All' || listing.roomType === roomTypeFilter;

        // Bathrooms filter (for the room being rented)
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

                    {/* Search by Title */}
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

                    {/* Max Price Slider */}
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

                    {/* Sublease Period Filter */}
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

                    {/* Pet Friendly Filter */}
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

                    {/* Utilities Included Filter */}
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

                    {/* Rooms (Property) Filter */}
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
                                <p>
                                    <strong>Address:</strong> {listing.address}
                                </p>
                                <p>
                                    <strong>School:</strong> {listing.school}
                                </p>
                                <p>
                                    <strong>Pet Friendly:</strong> {listing.petFriendly ? 'Yes' : 'No'}
                                </p>
                                <p>
                                    <strong>Property Rooms:</strong> {listing.rooms}
                                </p>
                                <p>
                                    <strong>Utilities Included:</strong> {listing.utilitiesIncluded ? 'Yes' : 'No'}
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
                                <p>
                                    <strong>Price:</strong> ${listing.price}
                                </p>
                                <p>
                                    <strong>Sublease Period:</strong> {listing.timeFrame}
                                </p>
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
