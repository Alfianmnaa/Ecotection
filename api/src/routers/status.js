const express = require("express");
const router = express.Router();
const statusController = require("../controllers/status");

// buat status
router.post("/buat", statusController.buatStatus);

// update status
router.put("/update/:LaporanID", statusController.updateStatus);

// dapatkan status
router.get("/:LaporanID", statusController.dapatkanStatus);

module.exports = router;
