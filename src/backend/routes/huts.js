import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, name, lon, lat FROM huts"
  );
  res.json(rows);
});

export default router;