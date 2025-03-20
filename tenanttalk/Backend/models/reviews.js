const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userID: { type: mongoose.ObjectId, required: true },
    propertyID: { type: mongoose.ObjectId, required: true },
    landlordID: { type: mongoose.ObjectId, required},
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, unique: true },
    photoUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;