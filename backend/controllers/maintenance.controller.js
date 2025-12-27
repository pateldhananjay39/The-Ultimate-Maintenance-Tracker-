const MaintenanceRequest = require("../models/MaintenanceRequest");
const Equipment = require("../models/Equipment");
const { calculateRiskScore } = require("../services/riskScore.service");

/**
 * CREATE MAINTENANCE REQUEST
 * Auto-fills maintenance team from equipment
 * Supports corrective & preventive requests
 */
exports.createRequest = async (req, res) => {
  try {
    const { subject, equipmentId, type, scheduledDate } = req.body;

    if (!subject || !equipmentId || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    if (equipment.isScrapped) {
      return res
        .status(400)
        .json({ error: "This equipment is scrapped and unusable" });
    }

    const request = await MaintenanceRequest.create({
      subject,
      equipment: equipment._id,
      team: equipment.maintenanceTeam, // 🔥 AUTO-FILL
      type,
      scheduledDate: type === "preventive" ? scheduledDate : null,
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE REQUEST STATUS
 * Enforces strict workflow:
 * new → in_progress → repaired | scrap
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status, technician, durationHours } = req.body;
    const request = await MaintenanceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Maintenance request not found" });
    }

    const validFlow = {
      new: ["in_progress"],
      in_progress: ["repaired", "scrap"],
    };

    if (!validFlow[request.status]?.includes(status)) {
      return res.status(400).json({
        error: `Invalid transition from ${request.status} to ${status}`,
      });
    }

    request.status = status;

    if (technician) {
      request.technician = technician;
    }

    if (status === "repaired" && durationHours) {
      request.durationHours = durationHours;
    }

    // 🔥 SCRAP LOGIC
    if (status === "scrap") {
      await Equipment.findByIdAndUpdate(request.equipment, {
        isScrapped: true,
      });
    }

    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET ALL REQUESTS (KANBAN / LIST VIEW)
 */
exports.getAllRequests = async (_, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate("equipment")
      .populate("team")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * AI FEATURE:
 * CALCULATE RISK SCORE FOR EQUIPMENT
 * Based on historical maintenance data
 */
exports.getEquipmentRiskScore = async (req, res) => {
  try {
    const { equipmentId } = req.params;

    const requests = await MaintenanceRequest.find({
      equipment: equipmentId,
    });

    if (!requests.length) {
      return res.json({ equipmentId, riskScore: 0 });
    }

    const riskScore = calculateRiskScore(requests);

    res.json({
      equipmentId,
      riskScore,
      interpretation:
        riskScore > 70
          ? "High risk – preventive maintenance recommended"
          : riskScore > 40
          ? "Moderate risk"
          : "Low risk",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
