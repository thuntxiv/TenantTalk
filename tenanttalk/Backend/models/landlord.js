const mongoose = require('mongoose');
const { updateSearchIndex } = require('./user');
import { propertySchema } from './property';

const landlordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    properties: [propertySchema],
    reviews: [reviewSchema],
    rating: { type: Number },
    description: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    lastEdited: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

const Landlord = mongoose.model('Landlord', landlordSchema);

module.exports = Landlord;