const mongoose = require("mongoose");

const MaintenanceTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }],
});

module.exports = mongoose.model("MaintenanceTeam", MaintenanceTeamSchema);
