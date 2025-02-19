const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
    const { firstName, lastName, email, phone, question } = req.body; 
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
