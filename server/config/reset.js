import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { pool } from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const createCustomItemsTable = `
    CREATE TABLE IF NOT EXISTS custom_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        base_model VARCHAR(100) NOT NULL,
        color VARCHAR(50) NOT NULL,
        wheels VARCHAR(50) NOT NULL,
        interior VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const createOptionsTable = `
    CREATE TABLE IF NOT EXISTS options (
        id SERIAL PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
    )
`;

const seedOptions = `
    INSERT INTO options (category, name, price) VALUES
    ('base_model', 'Sedan', 25000),
    ('base_model', 'SUV', 35000),
    ('base_model', 'Sports Car', 45000),
    ('color', 'Red', 500),
    ('color', 'Blue', 500),
    ('color', 'Black', 0),
    ('color', 'White', 0),
    ('wheels', 'Standard', 0),
    ('wheels', 'Sport', 1000),
    ('wheels', 'Premium', 2000),
    ('interior', 'Cloth', 0),
    ('interior', 'Leather', 2000),
    ('interior', 'Premium Leather', 4000)
    ON CONFLICT DO NOTHING
`;

async function resetDatabase() {
  try {
    console.log("Connecting to database:", process.env.PGDATABASE);
    console.log("Host:", process.env.PGHOST);
    console.log("Port:", process.env.PGPORT);

    await pool.query(createCustomItemsTable);
    await pool.query(createOptionsTable);
    await pool.query(seedOptions);
    console.log("Database reset successful");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await pool.end();
  }
}

resetDatabase();
