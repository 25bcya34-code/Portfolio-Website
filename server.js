const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(express.json());

// MySQL (WORKS LOCALLY + LIVE)
const db = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});

db.connect(err => {
if (err) throw err;
console.log("MySQL Connected");
});

// API
app.post("/contact", (req, res) => {
const { name, email, message } = req.body;

const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

db.query(sql, [name, email, message], (err) => {
if (err) return res.send("Error");

res.send("✅ Message sent successfully!");
});
});

app.listen(process.env.PORT || 3000);