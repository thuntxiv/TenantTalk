import {mongoose} from "mongoose";

const propertySchema = new mongoose.Schema({
    landlordID: {type: mongoose.ObjectId },
    title: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    rent: { type: Number, required: true },
    type: { type: String, required: true },
    period: { type: String, required: true },
    lastEdited: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

export {Property, propertySchema};

