import React, { useEffect, useState } from "react";
import CardLaporanSaya from "./CardLaporanSaya";
import { axiosInstance } from "../../config";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const DisimpanLaporanSaya = () => {
  const [semuaData, setSemuaData] = useState([]);
  const [urutkan, setUrutkan] = useState("Terbaru"); // Memberikan nilai awal

  const { user } = useContext(UserContext);
  useEffect(() => {
    fetchLaporan();
  }, [urutkan]); // Menambahkan urutkan sebagai dependensi

  const fetchLaporan = async () => {
    try {
      const res = await axiosInstance.get("/aksi/laporan/kategori");
      let sortedData = [...res.data]; // Membuat salinan array untuk menghindari mutasi langsung
      if (urutkan === "Terbaru") {
        sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setSemuaData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4">
      <h4 className="font-extrabold md:text-3xl text-2xl">Laporan Disimpan.</h4>
      <div className="flex flex-wrap justify-between"></div>
      <div className="cardContainer flex flex-wrap justify-start gap-8 mt-6 mb-20 ">
        {semuaData
          .filter((laporan) => laporan.Disimpan.includes(user._id))
          .map((item, index) => {
            return <CardLaporanSaya itemData={item} fetchAgain={fetchLaporan} key={index} />;
          })}
        {semuaData.filter((laporan) => laporan.Disimpan.includes(user._id)).length === 0 && <p>Tidak ada postingan yang disimpan.</p>}
      </div>
    </section>
  );
};

export default DisimpanLaporanSaya;
