const express = require("express");
const router = express.Router();

const controller = require("../controllers/maintenance.controller");

router.post("/", controller.createRequest);
router.patch("/:id/status", controller.updateStatus);
router.get("/", controller.getAllRequests);
router.get("/risk/:equipmentId", controller.getEquipmentRiskScore);

module.exports = router;
