import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
const MongoClient = mongodb.MongoClient;
const mongodbURL = `mongodb+srv://${process.env.dbuser}:${process.env.dbpw}@tenanttalk.sdau3.mongodb.net/?retryWrites=true&w=majority&appName=tenanttalk`;
const dbName = 'tenanttalk';
const port = 3000;

mongoose.connect(mongodbURL).
  catch(error => handleError(error));

// Or:
try {
  await mongoose.connect(mongodbURL);
} catch (error) {
  handleError(error);
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});

app.get('/', (req, res) => {
    res.send('Hello World');  
  });


