import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar.tsx';
import Footer from './footer.tsx';
import '../styles/ListingDetails.css'; 

// Listing Framework
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

// Mock data, can be removed with fully implemented backend
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

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = React.useState<Listing | null>(null);
    const listingId = id;
    console.log("Listing ID:", Number(listingId));

    useEffect(() => {
        if (!(Number.isInteger(Number(listingId)))) {
            fetch(`http://localhost:5000/api/properties/${listingId}`).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then((data) => {
                console.log(data);
                // Assuming the API returns a listing object that matches the Listing interface
                let photoUrl = data.photoURL[0];
                if (data.photoURL.length === 0) {
                    photoUrl = studioImage;
                }
                setListing({
                    id: data.id,
                    title: data.title,
                    price: data.rent,
                    location: data.address,
                    address: data.address,
                    school: data.location,
                    petFriendly: data.petFriendly,
                    rooms: data.bedrooms,
                    utilitiesIncluded: data.utilitiesIncluded,
                    description: data.description,
                    imageUrl: photoUrl, 
                    timeFrame: data.period,
                    numberOfSuitemates: data.suitemates,
                    houseType: data.type,
                    bathrooms: data.bathrooms,
                });
            }).catch((error) => {
                console.error('Error fetching listing:', error);
            });
        } else {
            setListing(mockListings.find((listing) => listing.id === Number(listingId)) || null)
        }
    }, [listingId]);

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

            <button onClick={() => navigate(-1)} className="back-button">
                Go Back
            </button>

            {/* Top Section: Main Image & Quick Facts */}
            <div className="top-section">
                <div className="image-and-info">
                    <img className="main-image" src={listing.imageUrl} alt={listing.title} />
                    <div className="quick-facts">
                        <h1 className="price">${listing.price}</h1>
                        <p className="address">{listing.address}</p>
                    </div>
                </div>
            </div>

            {/* Highlights / Description Section */}
            <div className="highlights-section">
                <h2>Highlights</h2>
                <p className="detail-description">{listing.description}</p>

                <table className="highlights-table">
                    <tbody>
                        <tr>
                            <th>Location</th>
                            <td>{listing.location}</td>
                        </tr>
                        <tr>
                            <th>School</th>
                            <td>{listing.school}</td>
                        </tr>
                        <tr>
                            <th>Pet Friendly</th>
                            <td>{listing.petFriendly ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <th>Property Rooms</th>
                            <td>{listing.rooms || "Contact landlord"}</td>
                        </tr>
                        <tr>
                            <th>House Type</th>
                            <td>{listing.houseType || "Contact landlord"}</td>
                        </tr>
                        <tr>
                            <th>Bathrooms</th>
                            <td>{listing.bathrooms || "Contact landlord"}</td>
                        </tr>
                        <tr>
                            <th>Suitemates</th>
                            <td>{listing.numberOfSuitemates || "Contact landlord"}</td>
                        </tr>
                        <tr>
                            <th>Utilities Included</th>
                            <td>{listing.utilitiesIncluded ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <th>Sublease Period</th>
                            <td>{listing.timeFrame || "Contact landlord"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
}

