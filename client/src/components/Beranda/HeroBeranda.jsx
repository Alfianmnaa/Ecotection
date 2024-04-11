import React from "react";
import HeroBerandaImg from "../../assets/Beranda/HeroBeranda.png";
import ArrowHero from "../../assets/Beranda/icon/ArrowHero.svg";
import { Link } from "react-router-dom";

const HeroBeranda = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${HeroBerandaImg})`,
  };
  return (
    <section>
      <div className="sm:h-[700px] h-[600px] w-full bg-no-repeat bg-cover p-8" style={backgroundImageStyle}>
        <div className="HeroCalltoac flex flex-col justify-center items-center h-full">
          <h1 className="2xl:text-headline1 md:text-6xl sm:text-5xl text-3xl text-white font-extrabold text-center lg:w-[780px] sm:w-[600px] w-[300px] mb-5">Laporkan Tindakan </h1>
          <h1 className="2xl:text-headline1 md:text-6xl sm:text-5xl text-3xl text-white font-extrabold text-center lg:w-[780px] sm:w-[600px] max-w-[600px]">Merusak Alam</h1>
          <p className="text-white 2xl:text-body lg:text-[18px] text-normal max-w-[920px] my-8 text-center">Hentikan kerusakan alam. Segera laporkan tindakan merusak alam demi masa depan yang lebih baik</p>
          <div className="flex flex-wrap justify-center">
            <Link to="/laporan">
              <button className="text-white hover:brightness-90 hover:border duration-150 sm:w-[280px] w-[220px] sm:px-6 sm:py-4 px-4 py-2 bg-transparent border-2 border-white rounded-[30px] md:text-normal text-smallText font-semibold sm:mr-3 mr-1 mb-2">
                Lihat laporan orang lain
              </button>
            </Link>
            <Link to="/laporkan">
              <button className="text-black bg-yellowMain hover:brightness-90  duration-150 sm:w-[280px] w-[220px] sm:px-6 sm:py-4 px-4 py-2 border-2 border-yellowMain rounded-[30px] md:text-normal text-smallText sm:ml-3 ml-0 mr-1 mb-2">
                <div className="flex items-center justify-center">
                  <span className="font-semibold ">Laporkan sekarang</span>
                  <img src={ArrowHero} alt="arrowhero" className="text-2xl sm:ml-4 ml-2" />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBeranda;
