const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

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

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// 🔹 Get memories by user
app.get("/memories/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT memory_id, caption, memory_date, image_data, image_type
       FROM memories
       WHERE user_id = $1
       ORDER BY memory_date DESC`,
      [userId]
    );

    const formatted = result.rows.map(row => ({
      ...row,
      image_data: row.image_data
        ? `data:${row.image_type};base64,${row.image_data.toString("base64")}`
        : null
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
