import {mongoose} from 'mongoose';
import { propertySchema } from './property.js';
import { User } from './user.js';

//landlord-specific schema extending the base User
const landlordSchema = new mongoose.Schema({
    properties: [ propertySchema ],
    rating: { type: Number },
    description: { type: String, required: true },
    lastEdited: { type: Date, default: Date.now }
});

// Landlord-specific methods (polymorphism)
landlordSchema.methods.getLandlordProfile = function() {
    const basicProfile = this.getBasicProfile();
    
    return {
        ...basicProfile,
        propertiesCount: this.properties ? this.properties.length : 0,
        rating: this.rating,
        description: this.description
    };
};

// Override the getBasicProfile method (polymorphism)
landlordSchema.methods.getBasicProfile = function() {
    // Parent method from User
    const basicProfile = User.prototype.getBasicProfile.call(this);
    
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

// Landlord model as a discriminator of User
// This implements inheritance in Mongoose
const Landlord = User.discriminator('Landlord', landlordSchema);

export { Landlord, landlordSchema };