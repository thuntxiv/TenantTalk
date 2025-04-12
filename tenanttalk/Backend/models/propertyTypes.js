import {mongoose} from "mongoose";
import {Property} from "./property.js";

// Apartment-specific schema
const apartmentSchema = new mongoose.Schema({
    floorLevel: { type: Number, required: true },
    hasElevator: { type: Boolean, default: false },
    parkingAvailable: { type: Boolean, default: false },
    isStudio: { type: Boolean, default: false },
    buildingName: String,
    yearBuilt: Number
});

// House-specific schema
const houseSchema = new mongoose.Schema({
    lotSize: { type: Number }, // in square feet/meters
    stories: { type: Number, required: true },
    hasGarage: { type: Boolean, default: false },
    hasYard: { type: Boolean, default: false },
    hasBasement: { type: Boolean, default: false },
    yearBuilt: Number
});

// Room-specific schema (for shared accommodations)
const roomSchema = new mongoose.Schema({
    isShared: { type: Boolean, default: false },
    totalRoommates: { type: Number, default: 0 },
    hasPrivateBathroom: { type: Boolean, default: false },
    furnishingLevel: { 
        type: String, 
        enum: ['unfurnished', 'partially furnished', 'fully furnished'],
        default: 'unfurnished'
    },
    hostType: {
        type: String,
        enum: ['owner', 'primary tenant', 'property manager'],
        default: 'owner'
    }
});

// Override base method with apartment-specific implementation (polymorphism)
apartmentSchema.methods.getDetailedInfo = function() {
    // Call the parent method first
    const basicInfo = this.getBasicInfo();
    
    // Add apartment-specific details
    return {
        ...basicInfo,
        floorLevel: this.floorLevel,
        hasElevator: this.hasElevator,
        parkingAvailable: this.parkingAvailable,
        isStudio: this.isStudio,
        buildingName: this.buildingName,
        yearBuilt: this.yearBuilt
    };
};

// Override base method with house-specific implementation (polymorphism)
houseSchema.methods.getDetailedInfo = function() {
    // Call the parent method first
    const basicInfo = this.getBasicInfo();
    
    // Add house-specific details
    return {
        ...basicInfo,
        lotSize: this.lotSize,
        stories: this.stories,
        features: [
            this.hasGarage ? 'Garage' : null,
            this.hasYard ? 'Yard' : null,
            this.hasBasement ? 'Basement' : null
        ].filter(Boolean),
        yearBuilt: this.yearBuilt
    };
};

// Override base method with room-specific implementation (polymorphism)
roomSchema.methods.getDetailedInfo = function() {
    // Call the parent method first
    const basicInfo = this.getBasicInfo();
    
    // Add room-specific details
    return {
        ...basicInfo,
        isShared: this.isShared,
        totalRoommates: this.totalRoommates,
        hasPrivateBathroom: this.hasPrivateBathroom,
        furnishingLevel: this.furnishingLevel,
        hostType: this.hostType
    };
};

// Create discriminator models that inherit from Property
const Apartment = Property.discriminator('Apartment', apartmentSchema);
const House = Property.discriminator('House', houseSchema);
const Room = Property.discriminator('Room', roomSchema);

export { Apartment, House, Room };