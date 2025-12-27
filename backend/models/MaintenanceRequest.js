const mongoose = require("mongoose");

const MaintenanceRequestSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceTeam",
    required: true,
  },
  technician: String,
  type: { type: String, enum: ["corrective", "preventive"], required: true },
  status: {
    type: String,
    enum: ["new", "in_progress", "repaired", "scrap"],
    default: "new",
  },
  scheduledDate: Date,
  durationHours: Number,
}, { timestamps: true });

module.exports = mongoose.model("MaintenanceRequest", MaintenanceRequestSchema);
