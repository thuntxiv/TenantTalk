import {mongoose} from "mongoose";

// Add discriminator key for polymorphic review types
const options = { discriminatorKey: 'reviewType', collection: 'reviews' };

// Base review schema
const reviewSchema = new mongoose.Schema({
    userID: { type: mongoose.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    photoUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
}, options);

// Add base methods that all review types will inherit
reviewSchema.methods.getBasicInfo = function() {
    return {
        id: this._id,
        userID: this.userID,
        title: this.title,
        rating: this.rating,
        createdAt: this.createdAt,
        reviewType: this.reviewType
    };
};

// Virtual for checking if review is recent (within last 30 days)
reviewSchema.virtual('isRecent').get(function() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.createdAt >= thirtyDaysAgo;
});

// Static method to find recent reviews
reviewSchema.statics.findRecent = function(days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return this.find({ createdAt: { $gte: cutoffDate } }).sort({ createdAt: -1 });
};

// Create the base Review model
const Review = mongoose.model('Review', reviewSchema);

// Property review schema - extends base review
const propertyReviewSchema = new mongoose.Schema({
    propertyID: { type: mongoose.ObjectId, required: true },
    cleanliness: { type: Number, min: 1, max: 5 },
    location: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 }
});

// Landlord review schema - extends base review
const landlordReviewSchema = new mongoose.Schema({
    landlordID: { type: mongoose.ObjectId, required: true },
    communication: { type: Number, min: 1, max: 5 },
    responsiveness: { type: Number, min: 1, max: 5 },
    reliability: { type: Number, min: 1, max: 5 }
});

// Override method for property reviews (polymorphism)
propertyReviewSchema.methods.getDetailedInfo = function() {
    const basicInfo = this.getBasicInfo();
    
    return {
        ...basicInfo,
        propertyID: this.propertyID,
        cleanliness: this.cleanliness,
        location: this.location,
        value: this.value,
        averageSubRating: this.calculateAverageSubRating()
    };
};

// Add a specialized method for property reviews
propertyReviewSchema.methods.calculateAverageSubRating = function() {
    return (this.cleanliness + this.location + this.value) / 3;
};

// Override method for landlord reviews (polymorphism)
landlordReviewSchema.methods.getDetailedInfo = function() {
    const basicInfo = this.getBasicInfo();
    
    return {
        ...basicInfo,
        landlordID: this.landlordID,
        communication: this.communication,
        responsiveness: this.responsiveness,
        reliability: this.reliability,
        averageSubRating: this.calculateAverageSubRating()
    };
};

// Add a specialized method for landlord reviews
landlordReviewSchema.methods.calculateAverageSubRating = function() {
    return (this.communication + this.responsiveness + this.reliability) / 3;
};

// Create discriminator models that inherit from Review
const PropertyReview = Review.discriminator('PropertyReview', propertyReviewSchema);
const LandlordReview = Review.discriminator('LandlordReview', landlordReviewSchema);

export { Review, PropertyReview, LandlordReview, reviewSchema };