import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import {home, login} from './controllers/routeControllers.js';
import {User} from './models/user.js';
import {Property} from './models/property.js';
import {Landlord} from './models/landlord.js';
import {Review} from './models/reviews.js';

const app = express();
const MongoClient = mongodb.MongoClient;
const mongodbURL = `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@tenanttalk.sdau3.mongodb.net/?retryWrites=true&w=majority&appName=tenanttalk`;
const dbName = 'tenanttalk';
const port = 3000;

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
    const users = await Property.find();
    res.json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const users = await Review.find();
    res.json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/landlords', async (req, res) => {
  try {
    const users = await Landlord.find();
    res.json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


