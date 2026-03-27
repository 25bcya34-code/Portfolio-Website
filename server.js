const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Very important to allow the front end to talk to the back end

const app = express();
const port = 3001; // Back-end will run on port 3001

// Middleware
app.use(cors()); // Allow Cross-Origin Requests
app.use(bodyParser.json()); // Support JSON-encoded bodies

// MySQL Connection Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // YOUR MYSQL USERNAME
    password: 'yourpassword', // YOUR MYSQL PASSWORD
    database: 'portfolio'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
    } else {
        console.log('Successfully connected to MySQL');
    }
});

// Define the API Endpoint (what the front end calls)
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received Message:', { name, email, message });

    // The SQL query to insert data
    const query = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    
    // Execute the query securely using parameterized values
    db.query(query, [name, email, message], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Failed to save message' });
        } else {
            console.log('Message stored in database. ID:', results.insertId);
            res.status(200).json({ status: 'success', id: results.insertId });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});