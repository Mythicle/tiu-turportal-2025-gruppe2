import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        tp.trail_id,
        t.name,
        tp.lon,
        tp.lat,
        tp.point_order
      FROM trail_points tp
      JOIN trails t ON t.id = tp.trail_id
      ORDER BY tp.trail_id, tp.point_order
    `);

    res.json(rows);
  } catch (err) {
    console.error("Feil ved henting av stier:", err);
    res.status(500).json({ error: "Databasefeil" });
  }
});

export default router;