# Välkommen till CV API
Detta repository innehåller kod för en REST API som är framtagen med Express och NodeJs. API:et används för att hantera arbetserfarenheter (work experience) i ett CV. Funktioner för CRUD (Create, Read, Update, Delete) är implementerade.

### Länk
APIet kärs lokalt i port 3000: http://localhost:3000

### Installation
För att använda dett API ska detta repository klonas. Du behöver installera npm men npm install och servern startas genom npm run start (eller npm run dev med nodemon). Servern kommer att köras i porten 3000.

### Databas
Denna API använder en SQLite databas med namnet CV och består av en tabell med namnet workexperience. 

Databas: cv  
Tabell: workexperience

| Fält          | Datatyp                | Krav        | Beskrivning                          |
|--------------|------------------------|------------|--------------------------------------|
| id           | INTEGER                | PRIMARY KEY, AUTOINCREMENT | Unikt ID för varje post |
| company_name | TEXT                   | NOT NULL   | Namn på företag                     |
| position     | TEXT                   | NOT NULL   | Jobbtitel                           |
| description  | TEXT                   | NOT NULL   | Beskrivning av arbetet              |
| start_date   | DATE                   | NOT NULL   | Startdatum för anställning          |
| end_date     | DATE                   | NOT NULL   | Slutdatum för anställning           |
| location     | TEXT                   | NOT NULL   | Plats där arbetet utfördes          |

Ett objekt skickas som JSON-data med följande struktur:
{
  "company_name": "Mittuniversitetet",
  "position": "Senior Labbhandledare",
  "description": "Handledde ännu fler studenter",
  "start_date": "2019-01-01",
  "end_date": "2020-01-01",
  "location": "Sundsvall"
}

### Endpoints
| Metod | Endpoint                    | Beskrivning                         |
|------|----------------------------|-------------------------------------|
| GET  | /api/workexperience        | Hämtar alla arbetserfarenheter      |
| GET  | /api/workexperience/:id    | Hämtar en specifik arbetserfarenhet |
| POST | /api/workexperience        | Skapar en ny arbetserfarenhet       |
| PUT  | /api/workexperience/:id    | Uppdaterar en arbetserfarenhet      |
| DELETE | /api/workexperience/:id  | Tar bort en arbetserfarenhet        |

### Testning
APIet har testats genom verktyget Thunder Client i Visual Studio Code.
