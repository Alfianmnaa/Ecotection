import React from "react";
import terbaruIcon from "../../assets/Laporan/terbaru.svg";
import arrowKanan from "../../assets/Laporan/arrowKanan.svg";
import { Navbar2 } from "../Navbar/Navbar2";
import CardTerbaru from "../Laporan/CardTerbaru";

const SemuaTerbaru = () => {
  return (
    <>
      <Navbar2 />
      <section>
        <div className="xl:px-36 lg:px-32 sm:px-12 px-8 lg:py-28 py-16">
          <div className="flex items-center gap-2 my-8">
            <div className="text-[#38866C] flex items-center gap-2 font-medium  md:text-smallText text-verySmallText cursor-pointer">
              <p>Beranda</p>
              <img src={arrowKanan} alt="arrowKanan" />
            </div>
            <div className="text-[#38866C] flex items-center gap-2 font-medium md:text-smallText text-verySmallText cursor-pointer">
              <p>Laporan</p>
              <img src={arrowKanan} alt="arrowKanan" />
            </div>
            <div className=" font-medium md:text-smallText text-verySmallText cursor-pointer">
              <p>Laporan terbaru</p>
            </div>
          </div>
          <div className="flex items-center  ">
            <h3 className="md:text-[36px] sm:text-3xl text-2xl font-extrabold sm:mr-4 mr-2">Laporan Terbaru</h3>
            <img src={terbaruIcon} alt="terbarud" className="lg:w-12 sm:w-10 w-8" />
          </div>
          <CardTerbaru />
        </div>
      </section>
    </>
  );
};

export default SemuaTerbaru;
