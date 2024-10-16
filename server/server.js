import express from "express";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import customItemsRoutes from "./routes/customItemsRoutes.js";
import { fileURLToPath } from "url";
import { pool } from "./config/database.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(
    favicon(path.resolve(__dirname, "../", "client", "public", "lightning.png"))
  );
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve(__dirname, "public", "lightning.png")));
  app.use(express.static("public"));
}

app.use("/api", customItemsRoutes);

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) =>
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
  );
}

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database");
  });
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
