const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // To load variables from .env
const formController = require('./controllers/formController');

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For handling JSON

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
connectDB();

// Use the controller function for the POST request
app.post('/form', formController.submitForm);

app.listen(port, () => console.log(`Server running on port ${port}`));