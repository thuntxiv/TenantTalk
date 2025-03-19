import React from 'react';
import '../styles/Propertylisting.css';


const mockListings = [
    {
        id: 1,
        title: 'Cozy Studio',
        price: 1200,
        location: 'New York',
        description: 'A cozy studio in midtown Manhattan.',
        imageUrl: 'https://via.placeholder.com/300x200?text=Cozy+Studio'
    },
    {
        id: 2,
        title: 'Modern Loft',
        price: 2500,
        location: 'San Francisco',
        description: 'A modern loft near the bay.',
        imageUrl: 'https://via.placeholder.com/300x200?text=Modern+Loft'
    },
];

export default function Propertylisting() {
    return (
        <div className="property-listings">
            <h1>Property Listings</h1>
            <div className="listings-grid">
                {mockListings.map(listing => (
                    <div className="listing-card" key={listing.id}>
                        <img src={listing.imageUrl} alt={listing.title} />
                        <h2>{listing.title}</h2>
                        <p><strong>Location:</strong> {listing.location}</p>
                        <p><strong>Price:</strong> ${listing.price}</p>
                        <p>{listing.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
