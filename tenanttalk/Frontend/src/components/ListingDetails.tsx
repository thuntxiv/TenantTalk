import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ListingDetails.css'; // We'll define this CSS next
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

// Example mock data or fetched data
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

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const listingId = Number(id);
    const listing = mockListings.find((item) => item.id === listingId);

    if (!listing) {
        return (
            <div className="listing-details-page">
                <button onClick={() => navigate(-1)} className="back-button">
                    Go Back
                </button>
                <h2>Listing not found</h2>
            </div>
        );
    }

    return (
        <div className="listing-details-page">
            <button onClick={() => navigate(-1)} className="back-button">
                Go Back
            </button>

            {/* Top section: main image + quick facts */}
            <div className="top-section">
                <div className="image-and-info">
                    <img className="main-image" src={listing.imageUrl} alt={listing.title} />

                    <div className="quick-facts">
                        <h1 className="price">${listing.price.toLocaleString()}</h1>
                        <p className="address">{listing.address}</p>
                        <div className="stats">
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights / description */}
            <div className="highlights-section">
                <h2>Highlights</h2>
                <p>{listing.description}</p>
                {listing.petFriendly && <p>Pet Friendly: Yes</p>}
            </div>
        </div>
    );
}
