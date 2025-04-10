import {mongoose} from "mongoose";

const propertySchema = new mongoose.Schema({
    landlordID: {type: mongoose.ObjectId },
    title: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true,},
    rent: { type: Number, required: true },
    type: { type: String, required: true },
    period: { type: String, required: true },
    tags: { type: [String], required: true },
    photoURL: { type: [String] },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    roomType: { type: String, required: true },
    amenities: { type: [String], required: true },
    lastEdited: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

export {Property, propertySchema};

