const express = require("express");
const router = express.Router();

const controller = require("../controllers/team.controller");

router.post("/", controller.createTeam);
router.get("/", controller.getAllTeams);

module.exports = router;
