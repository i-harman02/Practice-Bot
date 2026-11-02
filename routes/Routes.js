const express = require("express");
const { getMediciens , makeAppointment} = require("../controller/Controller.js");
const logger = require("../middleware/Middleware.js");


const router = express.Router();

router.get("/api/medicines", logger , getMediciens );

router.post("/" , makeAppointment);

module.exports = router;