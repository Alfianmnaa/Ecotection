import React, { useEffect, useState } from "react";
import DoughnutChart from "./DoughnutChart";
import { axiosInstance } from "../../config";

const StatsSec2 = () => {
  const [topJenisLaporan, setTopJenisLaporan] = useState([]);
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
    findJenisLaporan(semuaData);
  }, [semuaData]);

  function findJenisLaporan(data) {
    const jenisCounts = {};

    // Menghitung jumlah masing-masing jenisLaporan
    data.forEach((entry) => {
      jenisCounts[entry.JenisKerusakan] = (jenisCounts[entry.JenisKerusakan] || 0) + 1;
    });

    // Mengubah data menjadi array dan mengurutkannya berdasarkan jumlah jenisLaporan
    const topKategoriLaporan = Object.entries(jenisCounts).sort((a, b) => b[1] - a[1]);
    setTopJenisLaporan(topKategoriLaporan);

    return topKategoriLaporan;
  }

  return (
    <section>
      <div className=" md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-10">
        <h3 className="text-center 2xl:text-[52px] sm:text-[42px] text-2xl font-extrabold mb-10">Statistik Aktivitas Ilegal</h3>

        <div className="flex flex-wrap lg:gap-8 gap-4 justify-around items-center">
          <DoughnutChart data={topJenisLaporan} />
          <p className="2xl:text-[18px] text-normal font-medium 2xl:w-[400px]  lg:w-[380px] sm:w-auto w-[330px]">
            Statistik menyatakan bahwa jenis kerusakan dengan laporan aktivitas ilegal terbanyak adalah{" "}
            {topJenisLaporan.map((kerusakan, index) => (
              <span key={index}>
                dengan jumlah laporan
                <b>
                  {" "}
                  {kerusakan[0]} {kerusakan[1]}
                </b>
                {index !== topJenisLaporan.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSec2;
