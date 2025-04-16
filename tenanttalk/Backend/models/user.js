import {mongoose} from "mongoose";
import { reviewSchema } from './reviews.js';

// Base Schema options with discriminatorKey for implementing inheritance
const options = { discriminatorKey: 'userType', collection: 'users' };

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    reviews: [ reviewSchema ],
    createdAt: { type: Date, default: Date.now }
}, options);

// Methods that can be inherited by child classes
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

// Static methods that can be inherited
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

userSchema.statics.findByUsername = function(username) {
    return this.findOne({ username : username });
};

userSchema.statics.findByUserID = function(userID) {
    return this.findOne({ userID : userID });
}

const User = mongoose.model('User', userSchema);

export {User, userSchema};