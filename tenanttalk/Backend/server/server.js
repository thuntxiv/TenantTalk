import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import {home, login} from '../controllers/routeControllers.js';
import {User} from '../models/user.js';
import {Property} from '../models/property.js';
import {Landlord} from '../models/landlord.js';
import {Review} from '../models/reviews.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//const MongoClient = mongodb.MongoClient;
const mongodbURL = `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@tenanttalk.sdau3.mongodb.net/tenantTalk?retryWrites=true&w=majority&appName=tenanttalk`;
const port = 5000;

//Allow port 3000
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

//Set DB
//const db = mongoose.connection.useDb("tenantTalk");

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});

app.get('/', (req, res) => { //Home route
    res.send('Hello World');  
});

app.get('/login', (req, res) => {
  res.send('login.html');  
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/properties', async (req, res) => {
  try {
    const property = await Property.find();
    res.json(property);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/landlords', async (req, res) => {
  try {
    const landlord = await Landlord.find();
    res.json(landlord);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get User by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Get Property by ID
app.get("/api/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Get Review by ID
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Get Landlord by ID
app.get("/api/landlords/:id", async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    if (!landlord) {
      return res.status(404).json({ error: "Landlord not found" });
    }
    res.status(200).json(landlord);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


/* 
 _______________
| POST METHODS  |
|_______________|

*/ 

app.post("/api/users", async (req, res) => {
  try {
      const user = new User(req.body);
      await mongoose.connection.collection("users").insertOne(user);
      res.status(201).json(user);
  } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
  }
});

app.post("/api/properties", async (req, res) => {
  try {
      const property = new Property(req.body);
      await property.save();
      res.status(201).json(property);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
      const review = new Review(req.body);
      await review.save();
      res.status(201).json(review);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

app.post("/api/landlords", async (req, res) => {
  try {
      const landlord = new Landlord(req.body);
      await landlord.save();
      res.status(201).json(landlord);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

/* 
 _______________
| PUT METHODS   |
|_______________|

*/ 

// Update User
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Update Property
app.put("/api/properties/:id", async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Review
app.put("/api/reviews/:id", async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Landlord
app.put("/api/landlords/:id", async (req, res) => {
  try {
    const updatedLandlord = await Landlord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLandlord) {
      return res.status(404).json({ error: "Landlord not found" });
    }
    res.status(200).json(updatedLandlord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 
 __________________
| DELETE METHODS   |
|__________________|

*/ 

// Delete User
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Delete Property
app.delete("/api/properties/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json({ message: "Property successfully deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Review
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json({ message: "Review successfully deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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