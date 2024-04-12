const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// import routes
const authRoutes = require("./src/routers/auth");
const userRoutes = require("./src/routers/user");
const laporanRoutes = require("./src/routers/laporan");
const laporanHistoryRoutes = require("./src/routers/history");
const statusRoutes = require("./src/routers/status");

// Konfigurasi Library
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());

// cors policy (tambahkan domain yang ingin di beri akses)
const corsOption = {
  origin: ["https://ecotection.netlify.app", "https://ecotection.netlify.app/", "http://localhost:5173", "http://localhost:3000", "http://localhost:4000"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());

// gunakan router
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/aksi", laporanRoutes);
app.use("/aksi", laporanHistoryRoutes);
app.use("/status", statusRoutes);

// test routes
app.get("/", (req, res) => {
  res.send("dari route" + req.path);
});

// koneksi ke mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Berhasil terhubung ke mongodb"))
  .catch((err) => console.log(err));

// koneksi ke backend
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("backend running on port " + PORT);
});
