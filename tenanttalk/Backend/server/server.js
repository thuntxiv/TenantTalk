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

app.get('/api/property', async (req, res) => {
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
      await user.save();
      res.status(201).json(user);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

app.post("/api/landlords", async (req, res) => {
  try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});
