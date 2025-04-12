import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import controller instances
import { 
  userController, 
  propertyController, 
  reviewController, 
  forumController, 
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


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//const MongoClient = mongodb.MongoClient;
const mongodbURL = `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@tenanttalk.sdau3.mongodb.net/tenantTalk?retryWrites=true&w=majority&appName=tenanttalk`;
const port = 5000;

app.use(cors({ origin: "http://localhost:3000" }));

//Error Handling
let handleError = (error) => {
  console.error(error);
}

//Connect to MongoDB
mongoose.connect(mongodbURL).
  catch(error => handleError(error));
try {
  await mongoose.connect(mongodbURL);
} catch (error) {
  handleError(error);
}

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
  res.send('login.html');  
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

// Create user (handles both regular users and landlords polymorphically)
app.post('/api/users', userController.create.bind(userController));

// Update user
app.put('/api/users/:id', userController.update.bind(userController));

// Delete user
app.delete('/api/users/:id', userController.delete.bind(userController));


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

// Create review (handles both property and landlord reviews polymorphically)
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

// Get popular forum posts
app.get('/api/forumposts/popular', forumController.getPopular.bind(forumController));

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

//Get chat by ID
app.get("/api/chats/:id", async (req, res) => {
  try {
    const chat = await mongoose.connection.collection("chats").findOne({ 
      _id: new mongoose.Types.ObjectId(req.params.id)
    });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

//Create new chat
app.post("/api/chats", async (req, res) => {
  try {
    const chat = new Chat(req.body);
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});