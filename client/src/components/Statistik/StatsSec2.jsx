import React, { useEffect, useState } from "react";
import BarChartY from "./BarChartY";
import dataLaporan from "./jenis";
import DoughnutChart from "./DoughnutChart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import DateFilterButton from "./DateFilterButton";

const StatsSec2 = () => {
  const [topJenisLaporan, setJenisLaporan] = useState([]);

  useEffect(() => {
    findJenisLaporan(dataLaporan);
  }, []);

  function findJenisLaporan(data) {
    const jenisCounts = {};

    // Menghitung jumlah masing-masing jenisLaporan
    data.forEach((entry) => {
      jenisCounts[entry.jenisLaporan] = (jenisCounts[entry.jenisLaporan] || 0) + 1;
    });

    // Mengubah data menjadi array dan mengurutkannya berdasarkan jumlah jenisLaporan
    const topKategoriLaporan = Object.entries(jenisCounts).sort((a, b) => b[1] - a[1]);
    setJenisLaporan(topKategoriLaporan);

    return topKategoriLaporan;
  }

  const dateOptions = [{ text: "HARI INI" }, { text: "KEMARIN" }, { text: "7 HARI TERAKHIR" }, { text: "30 HARI TERAKHIR" }, { text: "1 TAHUN TERAKHIR" }, { text: "SEPANJANG WAKTU" }];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
    console.log(index);
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    <section>
      <div className=" md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-10">
        <h3 className="text-center 2xl:text-[52px] sm:text-[42px] text-2xl font-extrabold mb-10">Statistik Aktivitas Ilegal</h3>
        <div className="slick-container mb-8">
          <Slider {...settings}>
            {dateOptions.map((option, index) => (
              <DateFilterButton key={index} activeIndex={activeIndex} index={index} text={option.text} handleClick={handleClick} />
            ))}
          </Slider>
        </div>

        <div className="flex flex-wrap lg:gap-8 gap-4 justify-around items-center">
          <DoughnutChart data={topJenisLaporan} />
          <p className="2xl:text-[18px] text-normal font-medium 2xl:w-[400px]  lg:w-[380px] sm:w-auto w-[330px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A totam explicabo nisi similique iusto quam. Maxime eaque dolorem consequatur voluptatem quae at debitis saepe explicabo, harum quidem quod, temporibus, pariatur iusto?
            Debitis ullam pariatur, qui voluptatem a doloribus consectetur beatae! Amet iure iusto deleniti tenetur quas eveniet sapiente alias, nulla perferendis? Fugiat maxime eaque quibusdam, nesciunt expedita nemo commodi esse nulla
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSec2;
