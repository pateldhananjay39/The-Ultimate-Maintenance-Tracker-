// =======================
// LOAD ENV VARIABLES
// =======================
require("dotenv").config();

// =======================
// IMPORTS
// =======================
const express = require("express");
const mongoose = require("mongoose");

// =======================
// ROUTES
// =======================
const equipmentRoutes = require("./routes/equipment.routes");
const maintenanceRoutes = require("./routes/maintenance.routes");
const teamRoutes = require("./routes/team.routes");

// =======================
// APP INIT
// =======================
const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());

// =======================
// DATABASE CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
    process.exit(1); // HARD FAIL if DB not connected
  });

// =======================
// API ROUTES
// =======================
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/teams", teamRoutes);

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.status(200).send("🚀 GearGuard API is running");
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
