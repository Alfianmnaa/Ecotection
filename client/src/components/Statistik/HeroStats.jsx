import React from "react";
import HeroStatsImg from "../../assets/Statistik/HeroStats.png";

const HeroStats = () => {
  return (
    <main>
      <div className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-10">
        <div className="flex flex-wrap items-center justify-around">
          <img src={HeroStatsImg} alt="statsImg" className="object-cover 2xl:max-w-[360px] w-[320px]" />
          <div className="2xl:max-w-[580px] max-w-[460px]">
            <h1 className="2xl:text-headline2 lg:text-[48px] sm:text-4xl text-3xl font-extrabold my-2">Statistik Laporan</h1>
            <p className="2xl:text-subheadline sm:text-body text-normal font-semibold my-6">Visualisasi Data Laporan yang Diterima</p>
            <p className="2xl:text-body sm:text-[18px] text-normal font-semibold">
              Ecotection telah menerima ribuan laporan kerusakan alam dari seluruh Indonesia. Data ini membantu kita memahami masalah lingkungan yang paling mendesak dan mengarahkan upaya pelestarian alam dengan lebih efektif. Mari
              bergabung bersama kami untuk melindungi alam!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroStats;
