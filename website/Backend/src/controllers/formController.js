const { getDB } = require('../utils/db'); // Import getDB from db.js
const validateEmail = require('../utils/validateEmail'); // Import the validateEmail function

async function submitForm(req, res) {
    const { firstName, lastName, email, question } = req.body; // Remove phone from here

    // Use the validateEmail function to check if the email is valid
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        const db = getDB(); // Use getDB() to get the database connection
        const collection = db.collection('submissions');

        // Insert the form data into the 'submissions' collection, without phone
        const result = await collection.insertOne({ firstName, lastName, email, question });
        res.status(201).json({ message: 'Thanks! I have recieved your message!', id: result.insertedId });
    } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { submitForm };



