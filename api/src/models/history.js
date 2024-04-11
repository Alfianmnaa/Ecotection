const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const History = new Schema(
  {
    Pemilik: {
      type: String,
      required: true,
    },
    PemilikID: {
      type: String,
      required: true,
    },
    BuktiLaporan: {
      type: String,
      required: true,
    },
    DeskripsiLaporan: {
      type: String,
      required: true,
    },
    JenisKerusakan: {
      type: String,
      required: true,
    },
    Provinsi: {
      type: String,
      required: true,
    },
    Kabupaten: {
      type: String,
      required: true,
    },
    JenisLaporan: {
      type: String,
      required: true,
    },
    AlamatDetail: {
      type: String,
      required: true,
    },
    DitindakOleh: {
      type: String,
      required: true,
    },
    StatusSekarang: {
      type: String,
      default: "",
    },
    LaporanID: {
      type: String,
      default: true,
    },
    UpVote: {
      type: Array,
      default: [],
    },
    Disimpan: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", History);
