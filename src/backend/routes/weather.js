import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "lat og lon kreves" });
  }

  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

  const r = await fetch(url, {
    headers: {
      "User-Agent": "UtiUtopia-MapApp/1.0"
    }
  });

  const data = await r.json();
  res.json(data);
});

export default router;