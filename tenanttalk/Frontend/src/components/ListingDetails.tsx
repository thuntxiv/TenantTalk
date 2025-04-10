import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/ListingDetails.css'; // Use your CSS file for styling

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

const studioImage = require('../imgs/Studio_listing_1.jpeg');
const loftImage = require('../imgs/Loft_Example.jpg');

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

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const listingId = Number(id);
    const listing = mockListings.find((item) => item.id === listingId);

    if (!listing) {
        return (
            <div className="listing-details-page">
                <Navbar />
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Listing not found</h2>
                    <button onClick={() => navigate(-1)} className="back-button">
                        Go Back
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="listing-details-page">
            <Navbar />

            {/* "Go Back" Button */}
            <button onClick={() => navigate(-1)} className="back-button">
                Go Back
            </button>

            {/* Top Section: Main Image & Quick Facts */}
            <div className="top-section">
                <div className="image-and-info">
                    <img className="main-image" src={listing.imageUrl} alt={listing.title} />
                    <div className="quick-facts">
                        <h1 className="price">${listing.price.toLocaleString()}</h1>
                        <p className="address">{listing.address}</p>
                        {/* Additional quick stats can go here if needed */}
                    </div>
                </div>
            </div>

            {/* Highlights / Description Section */}
            <div className="highlights-section">
                <h2>Highlights</h2>
                <p>{listing.description}</p>
                <ul className="detail-highlights">
                    <li>
                        <strong>Location:</strong> {listing.location}
                    </li>
                    <li>
                        <strong>School:</strong> {listing.school}
                    </li>
                    <li>
                        <strong>Pet Friendly:</strong> {listing.petFriendly ? 'Yes' : 'No'}
                    </li>
                    <li>
                        <strong>Property Rooms:</strong> {listing.rooms}
                    </li>
                    <li>
                        <strong>Room Type:</strong> {listing.roomType}
                    </li>
                    <li>
                        <strong>Bathrooms:</strong> {listing.bathrooms}
                    </li>
                    <li>
                        <strong>Suitemates:</strong> {listing.numberOfSuitemates}
                    </li>
                    <li>
                        <strong>Utilities Included:</strong> {listing.utilitiesIncluded ? 'Yes' : 'No'}
                    </li>
                    <li>
                        <strong>Sublease Period:</strong> {listing.timeFrame}
                    </li>
                </ul>
            </div>

            <Footer />
        </div>
    );
}
