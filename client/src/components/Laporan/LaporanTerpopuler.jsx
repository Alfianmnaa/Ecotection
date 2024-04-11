import React, { useState } from "react";
import trendingIcon from "../../assets/Laporan/populer.svg";
import terbaruIcon from "../../assets/Laporan/terbaru.svg";
import CardTerbaru from "./CardTerbaru";
import CardKategori from "./CardKategori";
import CardTerpopuler from "./CardTerpopuler";
import CardSearch from "./CardSearch";

const LaporanTerpopuler = () => {
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
    <section>
      <div className="xl:px-36 lg:px-32 sm:px-12 px-8 lg:py-20 py-10">
        <div className="flex items-center">
          <h3 className="md:text-[36px] sm:text-3xl text-2xl font-extrabold sm:mr-4 mr-2">Laporan terpopuler nasional</h3>
          <img src={trendingIcon} alt="trending" className="lg:w-12 sm:w-10 w-8" />
        </div>
        <CardTerpopuler />
        <div className="flex items-center mt-12 ">
          <h3 className="md:text-[36px] sm:text-3xl text-2xl font-extrabold sm:mr-4 mr-2">Laporan Terbaru</h3>
          <img src={terbaruIcon} alt="terbarud" className="lg:w-12 sm:w-10 w-8" />
        </div>
        <CardTerbaru />
        <div className="flex items-center mt-12 ">
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
  );
};

export default LaporanTerpopuler;
