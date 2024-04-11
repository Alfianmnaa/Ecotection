// import model
const User = require("../models/auth");
// hash password
const bcrypt = require("bcrypt");
// token jwt
const jwt = require("jsonwebtoken");

// REGISTRASI
exports.userRegister = async (req, res) => {
  try {
    const { username, email, password, fotoPengguna, namaLengkap, tanggalLahir, jenisKelamin, isAdmin, jumlahLaporan } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const userBaru = new User({ username, email, password: hashedPassword, fotoPengguna, namaLengkap, tanggalLahir, jenisKelamin, isAdmin, jumlahLaporan });
    const simpanUser = await userBaru.save();
    res.status(200).json({
      message: "user berhasil registrasi",
      simpanUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// MASUK
exports.userLogin = async (req, res) => {
  try {
    const temukanUser = await User.findOne({ username: req.body.username });
    if (!temukanUser) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(req.body.password, temukanUser.password);

    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const token = jwt.sign({ _id: temukanUser._id, username: temukanUser.username, email: temukanUser.email }, process.env.SECRET, { expiresIn: "3d" });
    const { password, ...info } = temukanUser._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true, // Hanya diaktifkan di mode produksi (HTTPS)
      })
      .status(200)
      .json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
exports.userLogout = async (req, res) => {
  try {
    res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

//REFETCH USER
exports.userRefetch = (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
};
