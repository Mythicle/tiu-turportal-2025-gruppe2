import express from "express";
import cors from "cors";

import hutsRoutes from "./routes/huts.js";
import trailsRoutes from "./routes/trails.js";
import weatherRoutes from "./routes/weather.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/huts", hutsRoutes);
app.use("/trails", trailsRoutes);
app.use("/weather", weatherRoutes);
app.use("/auth", authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});