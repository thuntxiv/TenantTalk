import {mongoose} from "mongoose";
import { reviewSchema } from './reviews.js';

// Base Schema options with discriminatorKey for implementing inheritance
const options = { discriminatorKey: 'userType', collection: 'users' };

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    reviews: [ reviewSchema ],
    createdAt: { type: Date, default: Date.now }
}, options);

// Add methods that can be inherited by child classes
userSchema.methods.getBasicProfile = function() {
    return {
        id: this._id,
        username: this.username,
        fullName: `${this.firstname} ${this.lastname}`,
        email: this.email,
        userType: this.userType,
        type: this.type
    };
};

// Add static methods that can be inherited
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

userSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
};

const User = mongoose.model('User', userSchema);

export {User, userSchema};