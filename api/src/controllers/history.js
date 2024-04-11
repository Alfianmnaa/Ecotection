const History = require("../models/history");

// buat laporan status selesai
exports.buatLaporanSelesai = async (req, res) => {
  try {
    const buatLaporan = new History(req.body);
    const simpanLaporan = await buatLaporan.save();
    res.status(200).json({
      message: "Laporan berhasil diselesaikan pihak Ecotection!",
      simpanLaporan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// semua laporan selesai
exports.semuaLaporanSelesai = async (req, res) => {
  try {
    const temukanLaporan = await History.find();
    res.status(200).json(temukanLaporan);
  } catch (error) {
    res.status(500).json(error);
  }
};

// dapatkan detail laporan selesai
exports.detailLaporanSelesai = async (req, res) => {
  try {
    const temukanDetail = await History.findById(req.params.id);
    res.status(200).json(temukanDetail);
  } catch (error) {
    res.status(500).json(error);
  }
};
