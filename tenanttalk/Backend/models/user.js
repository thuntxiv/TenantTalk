import {mongoose} from "mongoose";
import { reviewSchema } from './reviews.js';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    reviews: [ reviewSchema ],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export {User, userSchema};

