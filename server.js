const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection Configuration
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root", // Change this if your MySQL password is different
    database: "portfolio"
});

// ✅ Route to save contact form data
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Failed to save message" });
        }
        res.json({ message: "Saved ✅" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});