const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');  // Import express-session
require('dotenv').config();
const { connectDB } = require('./utils/db'); // Use shared DB connection
const formController = require('./controllers/formController');
const questionController = require('./controllers/questionController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',  // A secret key to sign the session ID cookie
    resave: false,  // Don't save session if it's not modified
    saveUninitialized: true,  // Create session if none exists
    cookie: { secure: false }  // For development, set to false; change to true in production with HTTPS
}));

connectDB(); // Connect to MongoDB once

// Form submission
app.post('/form', (req, res) => {
    formController.submitForm(req, res);
});

// Question submission
app.post('/question', (req, res) => {
    questionController.submitQuestion(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => console.log(`Server running on port ${port}`));
