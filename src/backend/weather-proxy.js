import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 4000;

// Håndter OPTIONS preflight
app.options("/weather", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat og lon kreves" });
  }

  try {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

    const r = await fetch(url, {
      headers: {
        "User-Agent": "UtiUtopia-MapApp/1.0 http://localhost:3000/kart",
        "Accept": "application/json",
      },
    });

    const data = await r.text();

    // Tillat frontend å hente proxyen
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(r.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Weather proxy kjører: http://localhost:${PORT}/weather`)
);
