const express = require("express");
const router = express.Router();

const controller = require("../controllers/equipment.controller");

router.post("/", controller.createEquipment);
router.get("/", controller.getAllEquipment);

module.exports = router;
