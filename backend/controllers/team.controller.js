const MaintenanceTeam = require("../models/MaintenanceTeam");

// CREATE MAINTENANCE TEAM
exports.createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Team name is required" });
    }

    const team = await MaintenanceTeam.create({
      name,
      members: members || [],
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL TEAMS
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await MaintenanceTeam.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
