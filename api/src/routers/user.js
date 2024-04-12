const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// GET ONE
router.get("/:id", userController.getUser);

// GET All
router.get("/", userController.getSemuaUser);

// UPDATE USER
router.put("/update/:id", userController.updateUser);

// DELETE
router.delete("/:id", userController.deleteUser);

module.exports = router;
