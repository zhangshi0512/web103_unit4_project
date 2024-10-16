import { pool } from "../config/database.js";

export const getAllCustomItems = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM custom_items ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM custom_items WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Custom item not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCustomItem = async (req, res) => {
  const { name, base_model, color, wheels, interior, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO custom_items (name, base_model, color, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, base_model, color, wheels, interior, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCustomItem = async (req, res) => {
  const { id } = req.params;
  const { name, base_model, color, wheels, interior, price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE custom_items SET name = $1, base_model = $2, color = $3, wheels = $4, interior = $5, price = $6 WHERE id = $7 RETURNING *",
      [name, base_model, color, wheels, interior, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Custom item not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCustomItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM custom_items WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Custom item not found" });
    }
    res.status(200).json({ message: "Custom item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOptions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM options");
    const options = result.rows.reduce((acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = [];
      }
      acc[option.category].push({ name: option.name, price: option.price });
      return acc;
    }, {});
    res.status(200).json(options);
  } catch (error) {
    console.error("Error fetching options:", error);
    res.status(500).json({ error: error.message });
  }
};
