const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    fotoPengguna: {
      type: String,
      default: "",
    },
    namaLengkap: {
      type: String,
      default: "",
    },
    tanggalLahir: {
      type: String,
      default: "",
    },
    jenisKelamin: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    jumlahLaporan: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
