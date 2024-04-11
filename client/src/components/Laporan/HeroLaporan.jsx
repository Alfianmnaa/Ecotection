import React, { useEffect, useRef, useState } from "react";
import HeroLaporanImg from "../../assets/Laporan/HeroLaporanImg.png";
import search from "../../assets/Laporan/search.svg";
import arrowDown from "../../assets/Laporan/arrowDown.svg";
import iconLocation from "../../assets/Laporan/location_on.svg";
import Indonesia from "../Laporkan/dataProvinsi";
import CardSearch from "./CardSearch";
import trendingIcon from "../../assets/Laporan/populer.svg";

const HeroLaporan = () => {
  const [isOpenProvinsi, setIsOpenProvinsi] = useState(false);
  const [pencarian, setPencarian] = useState(false);
  const [provinsiDipilih, setProvinsiDipilih] = useState("");
  const [userMencari, setUserMencari] = useState(false);
  const laporanRef = useRef(null);

  const handleProvinsiSelect = (option) => {
    setProvinsiDipilih(option);
    console.log(option);
  };

  const handleCari = () => {
    if (pencarian == "") {
      setUserMencari(false);
    } else {
      setUserMencari(true);
    }
  };
  useEffect(() => {
    if (userMencari) {
      // Scroll to the "Laporan yang Anda Cari" div
      laporanRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userMencari]);

  return (
    <section>
      <div>
        <div className="w-full 2xl:h-[700px] lg:h-[600px] md:h-[500px] h-[480px] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${HeroLaporanImg})` }}>
          <div className="w-full absolute 2xl:top-52 md:top-40 top-24 flex flex-col justify-center sm:p-10 p-4">
            <h2 className="text-white 2xl:text-headline2 md:text-[52px] text-3xl  font-extrabold text-center md:leading-normal leading-normal">Laporan Kerusakan Alam</h2>
            <p className="text-white 2xl:text-body text-normal my-8 text-center">Temukan tindakan-tindakan ilegal yang dilaporkan oleh masyarakat ke website Ecotection</p>
            <div className="flex mx-auto">
              <div>
                <div className="bg-white flex justify-between items-center px-4 py-6 rounded-l-md md:gap-2 gap-1 max-w-60  border-r-[1px] border-[#D9D9D9] cursor-pointer" onClick={() => setIsOpenProvinsi(!isOpenProvinsi)}>
                  <img src={iconLocation} alt="iconLocation" className="md:w-6 w-5" />
                  <span className="text-smallText font-semibold md:block hidden"> {provinsiDipilih || "Provinsi"}</span>
                  {provinsiDipilih ? " " : <img src={arrowDown} alt="arrowDown" className="md:w-2 w-1 md:block hidden" />}
                </div>

                {isOpenProvinsi && (
                  <div className="absolute z-50 w-72 max-h-96 overflow-y-scroll mt-1 bg-white shadow-lg rounded-md" onClick={() => setIsOpenProvinsi(false)}>
                    <ul className="p-2">
                      {Indonesia.map((provinsi, index) => (
                        <li className="cursor-pointer hover:bg-gray-100" key={index} onClick={() => handleProvinsiSelect(provinsi.namaProvinsi)}>
                          {provinsi.namaProvinsi}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="bg-white flex justify-between items-center px-4 py-2 rounded-r-md  lg:w-[840px] sm:w-[500px] max-w-[840px]">
                <input type="text" id="cari" className="w-full px-1 py-2 outline-none text-normal font-medium" placeholder="Cari disini" onChange={(e) => setPencarian(e.target.value)} />
                {userMencari ? (
                  ""
                ) : (
                  <button className="flex items-center py-2 md:px-6 px-2 md:ml-2 ml-0 rounded-md text-white bg-greenMain font-medium" onClick={handleCari}>
                    <img src={search} alt="searchicon" className="md:w-6 w-5 md:mr-4 mr-0" />
                    <span className="md:text-normal text-smallText md:block hidden">Cari</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {userMencari && (
        <div ref={laporanRef} className="xl:px-36 lg:px-32 sm:px-12 px-8 pt-10 ">
          <div className="flex items-center mt-12 ">
            <h3 className="md:text-[36px] sm:text-3xl text-2xl font-extrabold sm:mr-4 mr-2">Laporan yang anda cari</h3>
            <img src={trendingIcon} alt="trending" className="lg:w-12 sm:w-10 w-8" />
          </div>
          <CardSearch provinsiDipilih={provinsiDipilih} pencarian={pencarian} userMencari={userMencari} />
        </div>
      )}
    </section>
  );
};

export default HeroLaporan;
