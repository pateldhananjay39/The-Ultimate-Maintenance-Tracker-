const Equipment = require("../models/Equipment");

// CREATE EQUIPMENT
exports.createEquipment = async (req, res) => {
  try {
    const { name, serialNumber, department, location, maintenanceTeam } =
      req.body;

    if (!name || !serialNumber || !maintenanceTeam) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const equipment = await Equipment.create({
      name,
      serialNumber,
      department,
      location,
      maintenanceTeam,
    });

    res.status(201).json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL EQUIPMENT
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find().populate("maintenanceTeam");
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
