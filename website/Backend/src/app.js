const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDB } = require('./utils/db'); // Use shared DB connection
const formController = require('./controllers/formController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB(); // Connect to MongoDB once

app.post('/form', (req, res) => {
    formController.submitForm(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => console.log(`Server running on port ${port}`));
