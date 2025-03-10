const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path'); // Add path module
require('dotenv').config();
const { connectDB } = require('./utils/db');
const formController = require('./controllers/formController');
const questionController = require('./controllers/questionController');

const app = express();

// Environment variables
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 5000;
const SESSION_SECURE = process.env.SESSION_SECURE === 'true'; // Convert to boolean

// Configure CORS
app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
}));

app.use(bodyParser.json());

// Configure session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: SESSION_SECURE },
}));

connectDB();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname,'..', 'dist')));

// API endpoints
app.post('/form', formController.submitForm);
app.post('/question', questionController.submitQuestion);

// Handle client-side routing (React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});