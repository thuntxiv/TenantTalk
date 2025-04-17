import {mongoose} from 'mongoose';
import { propertySchema } from './property.js';
import { reviewSchema } from './reviews.js';

const landlordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    properties: [ propertySchema ],
    reviews: [ reviewSchema ],
    rating: { type: Number },
    description: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    lastEdited: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

landlordSchema.statics.findByLandlord= function(landlordID) {
    return this.findOne({ landlordID : landlordID});
};

const Landlord = mongoose.model("Landlord", landlordSchema);

export {Landlord, landlordSchema};