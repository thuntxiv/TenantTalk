import {mongoose} from 'mongoose';
import { propertySchema } from './property.js';
import { reviewSchema } from './reviews.js';

const landlordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number },
    description: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    email: { type: String},
    phone: { type: String },
    photoURL: { type: String },
    lastEdited: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

landlordSchema.statics.findByLandlord= function(landlordID) {
    return this.findOne({ landlordID : landlordID});
};

landlordSchema.statics.findByIdAndUpdate = async function(id, update, options = {}) {
    if (!id) {
      throw new Error('findByIdAndUpdate requires an id');
    }
  
    const doc = await this.findById(id);
    if (!doc) {
      return null; 
    }
  
    Object.keys(update).forEach(key => {
        doc[key] = update[key];
    });

    if (options.runValidators) {
        await doc.validate();
    }

    return doc.save();
  };

const Landlord = mongoose.model("Landlord", landlordSchema);

export {Landlord, landlordSchema};