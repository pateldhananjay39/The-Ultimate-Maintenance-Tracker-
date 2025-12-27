const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenance.controller");

router.post("/", controller.createRequest);
router.patch("/:id/status", controller.updateStatus);

module.exports = router;
