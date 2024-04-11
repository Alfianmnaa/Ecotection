const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history");

// tambah laporan selesai
router.post("/laporan/history", historyController.buatLaporanSelesai);

// dapatkan semua laporan selesai
router.get("/semua/laporan/history", historyController.semuaLaporanSelesai);

// dapatkan detail laporan selesai
router.get("/laporan/history/:id", historyController.detailLaporanSelesai);

module.exports = router;
