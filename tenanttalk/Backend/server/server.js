import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import {home, login} from './controllers/routeControllers.js';

const app = express();
const MongoClient = mongodb.MongoClient;
const mongodbURL = `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@tenanttalk.sdau3.mongodb.net/?retryWrites=true&w=majority&appName=tenanttalk`;
const dbName = 'tenanttalk';
const port = 3000;


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


