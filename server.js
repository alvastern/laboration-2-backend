"use strict";

const express = require('express');  // Importera express
const sqlite3 = require('sqlite3').verbose();  // Importera SQLite
const cors = require('cors');  // Importera CORS för att hantera cross-origin requests
const path = require('path');  // Importera path för hantering av filvägar

const app = express();  // Använd express
const PORT = 3000;  // Port 3000 kommer att anvädas för servern

// Använd CORS och JSON middleware
app.use(cors());
app.use(express.json());

// Skapande och användning av databas i SQLite
const dbPath = path.join(__dirname, 'cv.db');  // Skapar en sökväg till databasen

// Anslutning till databasen
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Kunde inte ansluta till databas', err.message);
    } else {
        console.log('Ansluten till databas');
    }
});

// Skapad tabell för databasen workexperience
db.run(`
    CREATE TABLE IF NOT EXISTS workexperience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        position TEXT NOT NULL,
        description TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        location TEXT NOT NULL
    )`);

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Välkommen till CV API" });
});

app.listen (PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});