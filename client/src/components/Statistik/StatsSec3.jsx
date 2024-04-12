import React, { useEffect, useState } from "react";
import BarChartY from "./BarChartY";
import { axiosInstance } from "../../config";

const StatsSec3 = () => {
  const [topProvinces, setTopProvinces] = useState([]);
  const [semuaData, setSemuaData] = useState([]);

  useEffect(() => {
    fetchLaporan();
  }, []); // Menambahkan kategori sebagai dependency

  const fetchLaporan = async () => {
    try {
      const res = await axiosInstance.get("/aksi/laporan/kategori");
      setSemuaData(res.data);
      // Mengambil data user untuk setiap laporan
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    findTopProvinces(semuaData);
  }, [semuaData]);

  function findTopProvinces(data) {
    const provinceCounts = {};

    // Menghitung jumlah masing-masing provinsi
    data.forEach((entry) => {
      provinceCounts[entry.Provinsi] = (provinceCounts[entry.Provinsi] || 0) + 1;
    });

    // Mengubah data menjadi array dan mengurutkannya berdasarkan jumlah provinsi
    const sortedProvinces = Object.entries(provinceCounts).sort((a, b) => b[1] - a[1]);

    // Mengambil 4 provinsi teratas
    const topProvinces = sortedProvinces.slice(0, 4);
    setTopProvinces(topProvinces);

    return topProvinces;
  }

  return (
    <section>
      <div className=" md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-10">
        <h3 className="text-center 2xl:text-[52px] sm:text-[42px] text-2xl font-extrabold mb-10">Laporan Aktivitas Ilegal Tertinggi</h3>

        <div className="flex flex-wrap lg:gap-8 gap-4 justify-around items-center">
          <BarChartY data={topProvinces} />
          <p className="2xl:text-[18px] text-normal font-medium 2xl:w-[400px] lg:w-[380px] sm:w-auto w-[330px]">
            Statistik menyatakan bahwa provinsi dengan laporan aktivitas ilegal terbanyak adalah{" "}
            {topProvinces.map((province, index) => (
              <span key={index}>
                <b>{province[0]}</b> dengan jumlah laporan {province[1]}
                {index !== topProvinces.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSec3;
