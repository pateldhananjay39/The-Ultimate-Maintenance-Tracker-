const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true },
  department: String,
  location: String,
  maintenanceTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceTeam",
    required: true,
  },
  isScrapped: { type: Boolean, default: false },
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
