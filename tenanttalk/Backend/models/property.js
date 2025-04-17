import {mongoose} from "mongoose";

// Options object 
const options = { discriminatorKey: 'propertyType', collection: 'properties' };

// Base property schema  
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
    suitmates: { type: Number },
    lastEdited: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
}, options);

// Base methods 
propertySchema.methods.getBasicInfo = function() {
    return {
        id: this._id,
        title: this.title,
        location: this.location,
        rent: this.rent,
        period: this.period,
        type: this.type,
        propertyType: this.propertyType,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms
    };
};

// Calculate rent per room 
propertySchema.methods.calculateRentPerRoom = function() {
    return this.bedrooms > 0 ? this.rent / this.bedrooms : this.rent;
};

// Static method to find properties by location
propertySchema.statics.findByLocation = function(location) {
    return this.find({ location: new RegExp(location, 'i') });
};

// Virtual for full address
propertySchema.virtual('fullAddress').get(function() {
    return `${this.address}, ${this.location}`;
});

const Property = mongoose.model('Property', propertySchema);

export {Property, propertySchema};