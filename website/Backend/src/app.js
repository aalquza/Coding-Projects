const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const { connectDB } = require('./utils/db');
const formController = require('./controllers/formController');
const questionController = require('./controllers/questionController');

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5174', // Replace with your client's origin
    credentials: true, // Allow cookies to be sent
}));

app.use(bodyParser.json());

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

connectDB();

app.post('/form', (req, res) => {
    formController.submitForm(req, res);
});

app.post('/question', (req, res) => {
    questionController.submitQuestion(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => console.log(`Server running on port ${port}`));