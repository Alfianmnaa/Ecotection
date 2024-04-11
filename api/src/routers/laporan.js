const express = require("express");
const router = express.Router();
const laporanController = require("../controllers/laporan");

// Buat Laporan
router.post("/laporkan", laporanController.buatLaporan);

// Dapatkan Semua Laporan Limit
router.get("/laporan/limit", laporanController.semuaLaporanLimit);

// Dapatkan Semua Laporan
router.get("/laporan/cari", laporanController.semuaLaporanPencarian);

// Dapatkan Semua Laporan
router.get("/laporan/kategori", laporanController.semuaLaporanKategori);

// Detail Laporan
router.get("/laporan/:id", laporanController.detailLaporan);

// edit laporan
router.put("/laporan/:id", laporanController.editLaporan);

// simpan laporan
router.put("/laporan/simpan/:id", laporanController.simpanLaporan);

// simpan laporan
router.put("/laporan/unsave/:id", laporanController.handleUnsave);

// upvote laporan
router.put("/laporan/upvote/:id", laporanController.upVoteLaporan);

// edit laporan
router.put("/laporan/downvote/:id", laporanController.downVoteLaporan);

// delete laporan
router.delete("/laporan/:id", laporanController.hapusLaporan);

module.exports = router;
