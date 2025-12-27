const express = require("express");
const router = express.Router();

const controller = require("../controllers/maintenance.controller");

// CREATE MAINTENANCE REQUEST
router.post("/", controller.createRequest);

// UPDATE REQUEST STATUS
router.patch("/:id/status", controller.updateStatus);

// GET ALL REQUESTS (KANBAN / LIST VIEW)
router.get("/", controller.getAllRequests);

// AI: GET EQUIPMENT RISK SCORE
router.get("/risk/:equipmentId", controller.getEquipmentRiskScore);

module.exports = router;
