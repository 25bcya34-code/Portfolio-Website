const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// --- MYSQL CONNECTION (Using your credentials) ---
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // Your password
    database: 'portfolio', // Your DB name
    waitForConnections: true,
    connectionLimit: 10
});

// Check connection
db.getConnection((err, conn) => {
    if (err) console.error("Database connection failed: ", err);
    else console.log("Connected to MySQL 'portfolio' database.");
    if (conn) conn.release();
});

// --- IMAGE UPLOAD CONFIG ---
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// --- API ROUTES ---

// 1. Save Contact Form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Contact saved!" });
    });
});

// 2. Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('No file.');
    const filePath = `/uploads/${req.file.filename}`;
    const sql = "INSERT INTO images (file_path) VALUES (?)";
    db.query(sql, [filePath], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ filePath });
    });
});

// 3. Fetch All Images
app.get('/api/images', (req, res) => {
    db.query("SELECT file_path FROM images ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));