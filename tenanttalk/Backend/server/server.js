
import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file (for local development)
dotenv.config();

// Derive __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import controller instances
import { 
  userController, 
  propertyController, 
  reviewController, 
  forumController,
  chatController,
  landlordController, 
  home, 
  login 
} from '../controllers/routeControllers.js';

// Import models 
import { User } from '../models/user.js';
import { Property } from '../models/property.js';
import { Apartment, House, Room } from '../models/propertyTypes.js';
import { Review, PropertyReview, LandlordReview } from '../models/reviews.js';
import { ForumPost, SubleasePost, RoommatePost, Comment } from '../models/forum.js';
import { Landlord } from '../models/landlord.js';
import { Chat, Message } from '../models/chats.js';

const app = express();

// Serve static files from the React frontend (e.g., JS, CSS)
app.use(express.static(path.join(__dirname, '../../Frontend/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure CORS for Heroku deployment
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://tenanttalkers-ff36b9b495cc.herokuapp.com' 
    : 'http://localhost:3000' 
}));

// Connect to MongoDB
console.log('MONGODB password:', process.env.dbpw);
console.log('MONGODB user:', process.env.dbuser);
const mongodbURL = `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@tenanttalk.sdau3.mongodb.net/tenantTalk?retryWrites=true&w=majority&appName=tenanttalk`;
mongoose.connect(mongodbURL).catch(error => {
  console.error('MongoDB connection error:', error);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});

/* 
 ________________
| BASIC ROUTES   |
|________________|
*/

// Home route
app.get('/', home);

// Login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Frontend/build', 'index.html'));
});

app.post('/api/login', login);



/* 
 _________________
| USER ROUTES     |
|_________________|
*/

// Get all users
app.get('/api/users', userController.getAll.bind(userController));

// Get user by ID
app.get('/api/users/:id', userController.getById.bind(userController));

// Get user by google ID
app.get('/api/users/google/:id', userController.getByUserID.bind(userController));

app.get('/api/users/generic/:param', userController.getByGeneric.bind(userController));

// Create user (handles both regular users and landlords polymorphically)
app.post('/api/users', userController.create.bind(userController));

// Update user
app.put('/api/users/:id', userController.update.bind(userController));

// Delete user
app.delete('/api/users/:id', userController.delete.bind(userController));

/* 
 _________________
| LANDLORD ROUTES |
|_________________|
*/

app.get('/api/landlords', landlordController.getAll.bind(landlordController));

app.get("/api/landlords/:id", landlordController.getById.bind(landlordController));

app.post("/api/landlords", async (req, res) => {
  try {
      const landlord = new Landlord(req.body);
      await landlord.save();
      res.status(201).json(landlord);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

// Update Landlord
app.put("/api/landlords/:id", landlordController.update.bind(landlordController));

// Delete Landlord
app.delete("/api/landlords/:id", async (req, res) => {
  try {
    const deletedLandlord = await Landlord.findByIdAndDelete(req.params.id);
    if (!deletedLandlord) {
      return res.status(404).json({ error: "Landlord not found" });
    }
    res.status(200).json({ message: "Landlord successfully deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/landlords/:id/properties", propertyController.getByLandlord.bind(landlordController));

/*________________
| PROPERTY ROUTES |
|_________________|
*/

// Get all properties
app.get('/api/properties', propertyController.getAll.bind(propertyController));

// Get property by ID
app.get('/api/properties/:id', propertyController.getById.bind(propertyController));

// Get properties by location
app.get('/api/properties/location/:location', propertyController.getByLocation.bind(propertyController));

// Create property (handles all property types polymorphically)
app.post('/api/properties', propertyController.create.bind(propertyController));

// Update property
app.put('/api/properties/:id', propertyController.update.bind(propertyController));

// Delete property
app.delete('/api/properties/:id', propertyController.delete.bind(propertyController));

/* 
 _________________
| REVIEW ROUTES   |
|_________________|
*/

// Get all reviews
app.get('/api/reviews', reviewController.getAll.bind(reviewController));

// Get review by ID
app.get('/api/reviews/:id', reviewController.getById.bind(reviewController));

// Get recent reviews
app.get('/api/reviews/recent', reviewController.getRecent.bind(reviewController));

// Create review
app.post('/api/reviews', reviewController.create.bind(reviewController));

// Update review
app.put('/api/reviews/:id', reviewController.update.bind(reviewController));

// Delete review
app.delete('/api/reviews/:id', reviewController.delete.bind(reviewController));

/* 
 _________________
| FORUM ROUTES    |
|_________________|
*/

// Get all forum posts
app.get('/api/forumposts', forumController.getAll.bind(forumController));

// Get forum post by ID
app.get('/api/forumposts/:id', forumController.getById.bind(forumController));

// Create forum post (handles different post types polymorphically)
app.post('/api/forumposts', forumController.create.bind(forumController));

// Update forum post
app.put('/api/forumposts/:id', forumController.update.bind(forumController));

// Delete forum post
app.delete('/api/forumposts/:id', forumController.delete.bind(forumController));

// Add comment to forum post
app.post('/api/forumposts/:id/comments', async (req, res) => {
  try {
    // Find the forum post by its _id
    const forumPost = await ForumPost.findById(req.params.id);
    if (!forumPost) {
      return res.status(404).json({ error: "Forum post not found" });
    }

    // Create a new comment 
    const newComment = {
      userId: req.body.userId,
      username: req.body.username,
      userAvatar: req.body.userAvatar,
      content: req.body.content,
      createdAt: new Date() 
    };
    
    forumPost.comments.push(newComment);

    await forumPost.save();

    res.status(201).json(forumPost);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

/* 
 _________________
| COMMENT ROUTES  |
|_________________|
*/

// GET a Comment by ID
app.get("/api/comments/:id", async (req, res) => {
  try {
    const comment = await mongoose.connection.collection("comments").findOne({ 
      _id: new mongoose.Types.ObjectId(req.params.id)
    });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE a Comment by ID
app.delete("/api/comments/:id", async (req, res) => {
  try {
    const result = await mongoose.connection.collection("comments").deleteOne({ 
      _id: new mongoose.Types.ObjectId(req.params.id)
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

/* 
 _________________
| CHAT ROUTES     |
|_________________|
*/

// Get chats by userID
app.get("/api/chats/user/:id", chatController.getById.bind(chatController));

// Get chats by chat id
app.get("/api/chat/:id", chatController.getOne.bind(chatController));

// Create new chat
app.post("/api/chats", chatController.create.bind(chatController));

// Add Message to Chat
app.post("/api/chats/:chatid/messages", chatController.addMessage.bind(chatController));

// Catch-all route for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Frontend/build', 'index.html'));
});
