import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
let pool;

export async function initDB() {
  try {
    // 1️⃣ Connect without specifying DB to create it
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Database "${DB_NAME}" ready`);
    await connection.end();

    // 2️⃣ Create pool for future queries
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });

    // 3️⃣ Create table for storing optimizations
    await pool.query(`
      CREATE TABLE IF NOT EXISTS optimizations (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asin VARCHAR(20) NOT NULL,
        fetched JSON NOT NULL,                -- Original product data
        optimized JSON NOT NULL,              -- AI-optimized data
        keywords JSON DEFAULT (JSON_ARRAY()), -- Suggested keywords
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of optimization
        version INT DEFAULT 1                 -- Optional: version number per ASIN
      )
    `);
    console.log("✅ Table 'optimizations' ready");
  } catch (err) {
    console.error("❌ DB initialization failed:", err.message);
  }
}

// Function to get the pool in other files
export function getDB() {
  if (!pool) throw new Error("Database not initialized. Call initDB() first.");
  return pool;
}
