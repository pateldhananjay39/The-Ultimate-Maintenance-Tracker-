const mongoose = require("mongoose");

const MaintenanceRequestSchema = new mongoose.Schema({
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
    required: true,
  },
  issue: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["open", "in-progress", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MaintenanceRequest", MaintenanceRequestSchema);
