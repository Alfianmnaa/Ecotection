import React, { useState } from "react";
import arrowKanan from "../../assets/Laporan/arrowKanan.svg";
import { Navbar2 } from "../Navbar/Navbar2";
import CardKategori from "../Laporan/CardKategori";

const SemuaKategori = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
    switch (index) {
      case 1:
        setSelectedCategory("Sampah");
        break;
      case 2:
        setSelectedCategory("Pencemaran");
        break;
      case 3:
        setSelectedCategory("Eksploitasi Hewan");
        break;
      case 4:
        setSelectedCategory("Perusakan Lingkungan");
        break;
      default:
        setSelectedCategory(null);
    }
  };
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
              <p>Laporan berdasarkan kategori</p>
            </div>
          </div>
          <div className="flex items-center">
            <h3 className="md:text-[36px] text-2xl font-extrabold mr-4">Laporan Berdasarkan Kategori</h3>
          </div>
          <div className="flex flex-wrap mt-6 sm:gap-4 gap-2 mb-6">
            <div
              className={`md:text-normal text-smallText font-extrabold px-6  py-4 border-[1px] border-[#D7D9DA] md:rounded-lg rounded-sm cursor-pointer ${activeIndex === 1 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
              onClick={() => handleClick(1)}
            >
              Sampah
            </div>
            <div
              className={`md:text-normal text-smallText font-extrabold px-6 py-4 border-[1px] border-[#D7D9DA] rounded-lg cursor-pointer ${activeIndex === 2 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
              onClick={() => handleClick(2)}
            >
              Pencemaran
            </div>
            <div
              className={`md:text-normal text-smallText font-extrabold px-6 py-4 border-[1px] border-[#D7D9DA] rounded-lg cursor-pointer ${activeIndex === 3 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
              onClick={() => handleClick(3)}
            >
              Eksploitasi Hewan
            </div>
            <div
              className={`md:text-normal text-smallText font-extrabold px-6 py-4 border-[1px] border-[#D7D9DA] rounded-lg cursor-pointer ${activeIndex === 4 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
              onClick={() => handleClick(4)}
            >
              Perusakan Lingkungan
            </div>
          </div>
          <CardKategori selectedCategory={selectedCategory} />
        </div>
      </section>
    </>
  );
};

export default SemuaKategori;
