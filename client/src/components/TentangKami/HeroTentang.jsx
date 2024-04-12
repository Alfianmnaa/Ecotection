import React from "react";
import HeroTentangImg from "../../assets/TentangKami/HeroTentangImg.png";
import ArrowHero from "../../assets/Beranda/icon/ArrowHero.svg";
import { Link } from "react-router-dom";

const HeroTentang = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${HeroTentangImg})`,
  };
  return (
    <section>
      <div className="sm:h-[700px] h-[600px] w-full bg-no-repeat bg-cover p-8" style={backgroundImageStyle}>
        <div className="h-full">
          <div className="md:mt-44 md:ml-36 sm:mt-28 mt-20 ml-6">
            <h2 className="max-w-[790px] text-white 2xl:text-[48px] md:text-4xl text-3xl font-extrabold md:leading-normal leading-normal">
              <span className="text-yellowMain">Ecotection</span> untuk pelestarian alam Indonesia
            </h2>
            <p className=" text-white 2xl:text-body lg:text-[18px] sm:text-normal text-smallText max-w-[690px] my-2">
              Ecotection didirikan pada tahun 2024 oleh sekelompok individu yang peduli dengan alam Indonesia. Motivasi tersebut muncul dari keprihatinan terhadap tingginya tingkat kerusakan lingkungan serta keinginan untuk mengupayakan
              perbaikan demi masa depan yang lebih baik. Kami percaya bahwa melalui pemanfaatan teknologi dan keterlibatan aktif komunitas dapat memberikan kontribusi yang signifikan dalam menjaga kelestarian alam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTentang;
