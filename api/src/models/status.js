const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = new Schema(
  {
    LaporanID: {
      type: String,
      required: true,
    },
    PemProv: {
      type: String,
      required: true,
    },
    StatusPertama: {
      type: String,
      required: true,
    },
    WaktuStatusPertama: {
      type: String,
      required: true,
    },
    DeskripsiPertama: {
      type: String,
      required: true,
    },
    StatusKedua: {
      type: String,
      required: true,
    },
    WaktuStatusKedua: {
      type: String,
      required: true,
    },
    DeskripsiKedua: {
      type: String,
      required: true,
    },
    StatusKetiga: {
      type: String,
      required: true,
    },
    WaktuStatusKetiga: {
      type: String,
      required: true,
    },
    DeskripsiKetiga: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Status", Status);
