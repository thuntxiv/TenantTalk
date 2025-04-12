import {mongoose} from 'mongoose';
import { propertySchema } from './property.js';
import { User } from './user.js';

// Create a landlord-specific schema with fields that extend the base User
const landlordSchema = new mongoose.Schema({
    properties: [ propertySchema ],
    rating: { type: Number },
    description: { type: String, required: true },
    lastEdited: { type: Date, default: Date.now }
});

// Add landlord-specific methods (polymorphism)
landlordSchema.methods.getLandlordProfile = function() {
    // Get basic profile from parent User class
    const basicProfile = this.getBasicProfile();
    
    // Add landlord-specific information
    return {
        ...basicProfile,
        propertiesCount: this.properties ? this.properties.length : 0,
        rating: this.rating,
        description: this.description
    };
};

// Override the getBasicProfile method (polymorphism)
landlordSchema.methods.getBasicProfile = function() {
    // Call the parent method from User
    const basicProfile = User.prototype.getBasicProfile.call(this);
    
    // Enhance it with landlord-specific info
    return {
        ...basicProfile,
        isLandlord: true,
        rating: this.rating
    };
};

// Calculate average rating method
landlordSchema.methods.calculateAverageRating = function() {
    if (!this.reviews || this.reviews.length === 0) {
        return 0;
    }
    
    const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
    return sum / this.reviews.length;
};

// Create the Landlord model as a discriminator of User
// This implements inheritance in Mongoose
const Landlord = User.discriminator('Landlord', landlordSchema);

export { Landlord, landlordSchema };