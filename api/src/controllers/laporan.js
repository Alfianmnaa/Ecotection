const Laporan = require("../models/laporan");

// Buat Laporan
exports.buatLaporan = async (req, res) => {
  try {
    const laporanBaru = new Laporan(req.body);
    const simpanLaporan = await laporanBaru.save();
    res.status(200).json({
      message: "Laporan Berhasil Dibuat",
      simpanLaporan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Dapatkan Semua Laporan dengan Limit
exports.semuaLaporanLimit = async (req, res) => {
  try {
    let query = {}; // Query awal untuk mendapatkan semua laporan

    // Jika ada query parameter kategori, tambahkan filter berdasarkan kategori
    if (req.query.kategori) {
      query.JenisKerusakan = req.query.kategori;
    }

    // Temukan laporan berdasarkan query
    const temukanLaporan = await Laporan.find(query).sort({ createdAt: -1 });

    // Pengaturan untuk paginasi
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalLaporan = temukanLaporan.length;
    results.pageCount = Math.ceil(temukanLaporan.length / limit);

    // Jika ada di halaman terakhir maka tidak akan overflow ke atas
    if (lastIndex < temukanLaporan.length) {
      results.next = {
        page: page + 1,
      };
    }
    // Jika ada di halaman pertama maka tidak akan overflow ke bawah
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    // Mengambil data laporan sesuai dengan limit dan page yang diminta
    results.result = temukanLaporan.slice(startIndex, lastIndex);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Dapatkan Semua Laporan dengan Pencarian
exports.semuaLaporanPencarian = async (req, res) => {
  try {
    let query = {}; // query kosong untuk mendapatkan semua laporan secara default

    // Periksa apakah ada parameter pencarian yang disediakan
    if (req.query.pencarian) {
      const pencarianRegex = new RegExp(req.query.pencarian, "i");
      query.$or = [{ DeskripsiLaporan: pencarianRegex }, { JenisKerusakan: pencarianRegex }];
    }
    if (req.query.provinsi) {
      query.Provinsi = req.query.provinsi;
    }
    if (req.query.kabupaten) {
      query.Kabupaten = req.query.kabupaten;
    }
    if (req.query.alamat) {
      query.AlamatDetail = { $regex: new RegExp(req.query.alamat, "i") };
    }

    const getSemuaLaporan = await Laporan.find(query);
    res.status(200).json(getSemuaLaporan);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Dapatkan Semua Laporan dengan Kategori
exports.semuaLaporanKategori = async (req, res) => {
  try {
    let query = {}; // query kosong untuk mendapatkan semua laporan secara default

    if (req.query.kategori) {
      query.JenisKerusakan = req.query.kategori;
    }

    const getSemuaLaporan = await Laporan.find(query);
    res.status(200).json(getSemuaLaporan);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Dapatkan Detail Laporan
exports.detailLaporan = async (req, res) => {
  try {
    const detailLaporan = await Laporan.findById(req.params.id);
    res.status(200).json(detailLaporan);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Laporan
exports.editLaporan = async (req, res) => {
  try {
    const temukanDanUpdate = await Laporan.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Laporan Behasil Diubah",
      temukanDanUpdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// UpVote
exports.upVoteLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findByIdAndUpdate(
      req.params.id,
      { $push: { UpVote: req.body.userId } }, // userId harus dikirim dalam body request
      { new: true }
    );

    res.status(200).json({
      message: "Laporan berhasil di-upvote",
      laporan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// DownVote
exports.downVoteLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findByIdAndUpdate(
      req.params.id,
      { $pull: { UpVote: req.body.userId } }, // userId harus dikirim dalam body request
      { new: true }
    );

    res.status(200).json({
      message: "Laporan berhasil di-downvote",
      laporan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// DownVote
exports.handleUnsave = async (req, res) => {
  try {
    const laporan = await Laporan.findByIdAndUpdate(
      req.params.id,
      { $pull: { Disimpan: req.body.userId } }, // userId harus dikirim dalam body request
      { new: true }
    );

    res.status(200).json({
      message: "Laporan berhasil di-downvote",
      laporan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Simpan Laporan
exports.simpanLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findByIdAndUpdate(
      req.params.id,
      { $push: { Disimpan: req.body.userId } }, // userId harus dikirim dalam body request
      { new: true }
    );

    res.status(200).json({
      message: "Laporan berhasil di-upvote",
      laporan,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Hapus Laporan
exports.hapusLaporan = async (req, res) => {
  try {
    await Laporan.findByIdAndDelete(req.params.id);
    res.status(200).json("Laporan Berhasil Dihapus");
  } catch (error) {
    res.status(500).json(error);
  }
};
