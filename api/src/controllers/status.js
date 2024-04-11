const Status = require("../models/status");

// buat status
exports.buatStatus = async (req, res) => {
  try {
    const statusBaru = new Status(req.body);
    const simpanLaporan = await statusBaru.save();
    res.status(200).json({
      message: "status berhasill dibuat",
      simpanLaporan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get laporan
exports.dapatkanStatus = async (req, res) => {
  try {
    const dapatkanLaporan = await Status.findOne({ LaporanID: req.params.LaporanID });
    res.status(200).json(dapatkanLaporan);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update laporan
exports.updateStatus = async (req, res) => {
  try {
    const temukanDanUpdate = await Status.findOneAndUpdate({ LaporanID: req.params.LaporanID }, { $set: req.body }, { new: true });
    res.status(200).json({
      message: "Laporan Behasil Diubah",
      temukanDanUpdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
