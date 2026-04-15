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

// API för att hämta användarens work experience
app.get("/api/workexperience", (req, res) => {
    const sql = "SELECT * FROM workexperience";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


// Funktion i API för att lägga till work experience i databasen
app.post("/api/workexperience", (req, res) => {
    const { company_name, position, description, start_date, end_date, location } = req.body;

    if (!company_name || !position || !description || !start_date || !end_date || !location) {
        return res.status(400).json({ error: "Alla fält måste fyllas i" });
    }

    const sql = `
    INSERT INTO workexperience (company_name, position, description, start_date, end_date, location)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [company_name, position, description, start_date, end_date, location], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Work experience tillagd",
            id: this.lastID
        });
    });
});

// Funktion i API för att uppdatera en användaren work experience i databasen
app.put("/api/workexperience/:id", (req, res) => {
    const { id } = req.params;
    const { company_name, position, description, start_date, end_date, location } = req.body;

    if (!company_name || !position || !description || !start_date || !end_date || !location) {
        return res.status(400).json({ error: "Alla fält måste fyllas i" });
    }

    const sql = `
    UPDATE workexperience
    SET company_name = ?, position = ?, description = ?, start_date = ?, end_date = ?, location = ?
    WHERE id = ?
    `;

    db.run(sql, [company_name, position, description, start_date, end_date, location, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Work experience hittades inte" });
        }

        res.json({ message: "Work experience uppdaterad" });
    });
});

// Funktion i API för att ta bort en post från användaren
app.delete("/api/workexperience/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM workexperience WHERE id = ?";

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500),json({error: err.message});
        }

        if (this.changes === 0) {
            return res.status(404).json({error: "Work experience hittades inte"});
        }

        res.json({message:"Work experience raderad"});
    });
});

// Funktion i API för att hämta en specifik post från användarenS work experience
app.get("/api/workexperience/:id", (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM workexperience WHERE id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: "Work experience hittades inte" });
        }

        res.json(row);
    });
});