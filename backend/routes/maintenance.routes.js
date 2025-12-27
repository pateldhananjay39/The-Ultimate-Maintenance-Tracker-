const router = require("express").Router();
const ctrl = require("../controllers/maintenance.controller");

router.post("/", ctrl.createRequest);
router.get("/", ctrl.getRequests);

module.exports = router;
