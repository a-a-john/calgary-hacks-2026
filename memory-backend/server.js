const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 CONNECT TO YOUR POSTGRES DATABASE
const pool = new Pool({
  user: "postgres",        // change if different
  host: "localhost",
  database: "postgres",    // change if your DB name is different
  password: "YOUR_PASSWORD",
  port: 5432,
});

// 🔹 Utility function to read SQL files and replace placeholders
const readSQL = (filename, placeholders = {}) => {
  let sql = fs.readFileSync(path.join(__dirname, "sql", filename), "utf8");
  for (const key in placeholders) {
    sql = sql.replace(key, placeholders[key]);
  }
  return sql;
};

// 🔹 Helper function to format BYTEA images for React
const formatMemories = (rows) =>
  rows.map((row) => ({
    ...row,
    image_data: row.image_data
      ? `data:${row.image_type};base64,${row.image_data.toString("base64")}`
      : null,
  }));

// 🔹 Seed / prepopulate the database using DML.sql
const seedDatabase = async () => {
  try {
    const seedSQL = fs.readFileSync(path.join(__dirname, "sql", "DML.sql"), "utf8");
    await pool.query(seedSQL);
    console.log("Database seeded successfully from DML.sql.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// 🔹 READ ENDPOINTS 🔹

// All memories
app.get("/memories/all", async (req, res) => {
  const sort = req.query.sort === "ASC" ? "ASC" : "DESC";
  const sql = readSQL("get_all_memories.sql", { "{{SORT}}": sort });

  try {
    const result = await pool.query(sql);
    res.json(formatMemories(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Text-only memories
app.get("/memories/text", async (req, res) => {
  const sort = req.query.sort === "ASC" ? "ASC" : "DESC";
  const sql = readSQL("get_text_memories.sql", { "{{SORT}}": sort });

  try {
    const result = await pool.query(sql);
    res.json(formatMemories(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Image-only memories
app.get("/memories/image", async (req, res) => {
  const sort = req.query.sort === "ASC" ? "ASC" : "DESC";
  const sql = readSQL("get_image_memories.sql", { "{{SORT}}": sort });

  try {
    const result = await pool.query(sql);
    res.json(formatMemories(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Memories by user
app.get("/memories/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const sort = req.query.sort === "ASC" ? "ASC" : "DESC";
  const sql = readSQL("get_user_memories.sql", { "{{SORT}}": sort });

  try {
    const result = await pool.query(sql, [userId]);
    res.json(formatMemories(result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 🔹 CREATE ENDPOINT 🔹
app.post("/memories", async (req, res) => {
  const { user_id, caption, image_data, image_type, unlock_date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO memories (user_id, caption, image_data, image_type, unlock_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        user_id,
        caption,
        image_data ? Buffer.from(image_data, "base64") : null,
        image_type,
        unlock_date,
      ]
    );
    res.status(201).json(formatMemories(result.rows)[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 🔹 UPDATE ENDPOINT 🔹
app.put("/memories/:memoryId", async (req, res) => {
  const { memoryId } = req.params;
  const { caption, unlock_date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE memories
       SET caption = $1, unlock_date = $2
       WHERE memory_id = $3
       RETURNING *`,
      [caption, unlock_date, memoryId]
    );
    res.json(formatMemories(result.rows)[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 🔹 DELETE ENDPOINT 🔹
app.delete("/memories/:memoryId", async (req, res) => {
  const { memoryId } = req.params;

  try {
    await pool.query(`DELETE FROM memories WHERE memory_id = $1`, [memoryId]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 🔹 START SERVER after seeding
const startServer = async () => {
  await seedDatabase(); // prepopulate DB
  app.listen(5000, () => console.log("Server running on http://localhost:5000"));
};

startServer();