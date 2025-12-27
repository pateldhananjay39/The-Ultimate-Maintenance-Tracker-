require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const equipmentRoutes = require("./routes/equipment.routes");
const maintenanceRoutes = require("./routes/maintenance.routes");
const teamRoutes = require("./routes/team.routes");

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// =======================
// DB CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected"))
  .catch((err) =>
    console.error("❌ DB connection error:", err.message)
  );

// =======================
// ROUTES
// =======================
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/maintenance", require("./routes/maintenance.routes"));

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.send("🚀 GearGuard API is running");
});

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
