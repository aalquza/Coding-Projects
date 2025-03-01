// Import utility functions or other necessary modules
const { MongoClient } = require('mongodb');
const validateEmail = require('../utils/validateEmail'); // Assuming you have a validateEmail function

async function submitForm(req, res) {
    const { firstName, lastName, email, phone, question } = req.body;

    // Validate email before inserting data
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Logic to connect to MongoDB and insert data
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const database = client.db('Website');
        const collection = database.collection('submissions');

        const result = await collection.insertOne({ firstName, lastName, email, phone, question });
        res.status(201).json({ message: 'Form submitted successfully', id: result.insertedId });
    } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { submitForm };
