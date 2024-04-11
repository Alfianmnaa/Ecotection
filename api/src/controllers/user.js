const User = require("../models/auth");

// UPDATE
exports.updateUser = async (req, res) => {
  try {
    const temukanDanUpdate = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "user berhasil diupdate",
      temukanDanUpdate,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Berhasil Dihapus");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET SEMUA USER
exports.getSemuaUser = async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.status(200).json(getAllUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET USER
exports.getUser = async (req, res) => {
  try {
    const getOneUser = await User.findById(req.params.id);
    res.status(200).json(getOneUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
