import React from "react";
import HeroLaporan from "../components/Laporan/HeroLaporan";
import LaporanTerpopuler from "../components/Laporan/LaporanTerpopuler";
import { Navbar } from "../components/Navbar/Navbar";

const Laporan = () => {
  return (
    <>
      <Navbar />
      <HeroLaporan />
      <LaporanTerpopuler />
    </>
  );
};

export default Laporan;
