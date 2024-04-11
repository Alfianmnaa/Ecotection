import React from "react";
import DetilKiri from "../components/DetilLaporan/DetilKiri";
import { Navbar2 } from "../components/Navbar/Navbar2";
import DetilKanan from "../components/DetilLaporan/Detil.Kanan";

const DetilLaporan = () => {
  return (
    <>
      <Navbar2 />
      <section className="md:py-[120px] py-[100px] 2xl:px-28 sm:px-16 p-6">
        <h3 className="font-extrabold 2xl:text-[40px] md:text-3xl text-2xl text-center my-6">Detail laporan Aktvitas Ilegal</h3>
        <div className="flex flex-wrap md:gap-8 gap-3 justify-center">
          <DetilKiri />
          <DetilKanan />
        </div>
      </section>
    </>
  );
};

export default DetilLaporan;
