const Maintenance = require("../models/MaintenanceRequest");

exports.createRequest = async (req, res) => {
  try {
    const request = await Maintenance.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRequests = async (req, res) => {
  const data = await Maintenance.find().populate("equipment");
  res.json(data);
};
