# SalesDuo Assignment - Amazon Listing Optimizer

## 📁 Project Structure

```
salesduo_assignment
├── backend
│   ├── database
│   │   └── mock-data.js
│   ├── routes
│   │   └── optimize.js
│   ├── node_modules
│   ├── .env
│   ├── database.js
│   ├── db.sql
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
└── frontend
    ├── node_modules
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── assets
    │   ├── components
    │   │   ├── History.jsx
    │   │   ├── OptimizeForm.jsx
    │   │   └── ResultView.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    └── package.json
```

## ✅ Tech Stack

### Dependencies (Backend)

| Package        | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| express        | Web framework for creating API routes and server        |
| dotenv         | Load environment variables from .env file               |
| axios          | HTTP client (planned for future real Amazon data fetch) |
| cheerio        | HTML parsing & scraping (imported but currently unused) |
| mysql2/promise | MySQL client with Promise support                       |
| cors           | Enable Cross-Origin Resource Sharing                    |
| @google/genai  | Google GenAI client for AI content generation           |

### Dev Dependencies (Recommended)

| Package | Purpose                                      |
| ------- | -------------------------------------------- |
| nodemon | Automatically restart server on code changes |

## 📦 Installation Steps

### 1️⃣ Initialize Project

```bash
mkdir amazon-listing-optimizer
cd amazon-listing-optimizer
npm init -y
```

### 2️⃣ Install Core Dependencies

```bash
npm install express dotenv axios cheerio mysql2 cors @google/genai
```

### 3️⃣ Install Dev Dependencies (Optional)

```bash
npm install --save-dev nodemon
```

### 4️⃣ Setup .env File

Create a `.env` file in your backend directory and replace placeholders with **your own database password and Google API key**.

⚠️ Make sure to use **your actual credentials**, not the placeholders below.
Create a `.env` file in your backend directory

```env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=alo
AI_API_KEY=your_google_genai_api_key
```

### 5️⃣ Update Scripts in package.json

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### 6️⃣ ## ▶️ How to Run Backend


```bash
cd backend
npm run dev
```

Backend runs by default on `http://localhost:8080`.


### 7️⃣ ## ▶️ How to Run Frontend

```bash
cd frontend
npm run dev
```
Frontend runs by default on `http://localhost:5173`.

## ✅ Tech Stack

### Backend

* Node.js
* Express.js
* SQLite (db.sql)
* dotenv

### Frontend

* React (Vite)
* JSX Components
* CSS Modules





## 🔗 API Routes

### 1. Optimize Product Listing

**Endpoint:** `POST /api/optimize`

**Request Body Example:**

```json
{
  "asin": "MOCK001"
}
```

### 2. Sample Mock ASINs for Testing

You can use any of the following for demo/testing:

```
asin: "MOCK001"
asin: "MOCK002"
asin: "B07H65KP63"
asin: "B0B9Y7XQ9X"
asin: "B0B9Y7XQ9Y"
asin: "B0B9Y7XQ9Z"
asin: "B0B9Y7XQ9A"
asin: "B0B9Y7XQ9B"
asin: "B0B9Y7XQ9C"
asin: "B0B9Y7XQ9D"
asin: "B0B9Y7XQ9E"
asin: "B0B9Y7XQ9F"
asin: "B0B9Y7XQ9G"


```

This will trigger mocked listing optimization logic based on your sample dataset.

## 📌 Notes

* Uses local SQLite database located in `db.sql`
* Mock data file located at `backend/database/mock-data.js`
* Optimized results are shown on the frontend `ResultView.jsx`
* History is rendered in `History.jsx`

---
