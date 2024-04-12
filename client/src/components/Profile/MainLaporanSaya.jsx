import React, { useEffect, useState } from "react";
import CardLaporanSaya from "./CardLaporanSaya";
import { axiosInstance } from "../../config";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const MainLaporanSaya = () => {
  const [semuaData, setSemuaData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [urutkan, setUrutkan] = useState("Terbaru"); // Memberikan nilai awal
  const [statusCounts, setStatusCounts] = useState({
    Diverifikasi: 0,
    Diproses: 0,
    Selesai: 0,
  });

  const { user } = useContext(UserContext);
  useEffect(() => {
    fetchLaporan();
  }, [urutkan]); // Menambahkan urutkan sebagai dependensi

  useEffect(() => {
    fetchUser();
  }, [user]);

  useEffect(() => {
    calculateStatusCounts();
  }, [semuaData, filter]);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/user/${user?._id}`);
      setDataUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  const calculateStatusCounts = () => {
    const counts = {
      Diverifikasi: 0,
      Diproses: 0,
      Selesai: 0,
    };
    const filteredData = dataUser.isAdmin ? semuaData.filter((laporan) => laporan.Provinsi === dataUser.username) : semuaData.filter((laporan) => laporan.PemilikID === user?._id);

    filteredData.forEach((laporan) => {
      if (laporan.StatusSekarang === "Diverifikasi") {
        counts.Diverifikasi++;
      } else if (laporan.StatusSekarang === "Diproses") {
        counts.Diproses++;
      } else if (laporan.StatusSekarang === "Selesai") {
        counts.Selesai++;
      }
    });
    setStatusCounts(counts);
  };
  return (
    <section className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4">
      <div className="flex flex-wrap justify-between">
        <div className="my-2 flex gap-8">
          <div>
            <label htmlFor="filter" className="font-bold md:text-normal text-smallText">
              Filter:
            </label>
            <select name="filter" id="filter" className="lg:ml-2 focus:outline-none border-[1px] border-inputBorder rounded-md py-1 lg:px-4 px-2" onChange={(e) => setFilter(e.target.value)}>
              <option value="Semua">Semua</option>
              <option value="Belum Ditindaklanjut">Belum Ditindaklanjut</option>
              <option value="Diverifikasi">Diverifikasi</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
          <div>
            <label htmlFor="urutkan" className="font-bold md:text-normal text-smallText">
              Urutkan:
            </label>
            <select name="urutkan" id="urutkan" className="lg:ml-2 focus:outline-none border-[1px] border-inputBorder rounded-md py-1 lg:px-4 px-2" onChange={(e) => setUrutkan(e.target.value)}>
              <option value="Terbaru">Terbaru</option>
              <option value="Terlama">Terlama</option>
            </select>
          </div>
        </div>

        <div className="flex lg:gap-10 gap-6 lg:mt-0 mt-4">
          <div className="text-center">
            <p className="md:text-body text-normal font-semibold">Diverifikasi</p>
            <p className="font-bold text-[#0084FF] lg:text-4xl sm:text-3xl text-2xl">{statusCounts.Diverifikasi}</p>
          </div>
          <div className="text-center">
            <p className="md:text-body text-normal font-semibold">Diproses</p>
            <p className="font-bold text-[#C9AE17] lg:text-4xl sm:text-3xl text-2xl">{statusCounts.Diproses}</p>
          </div>
          <div className="text-center">
            <p className="md:text-body text-normal font-semibold">Selesai</p>
            <p className="font-bold text-[#53A88C] lg:text-4xl sm:text-3xl text-2xl">{statusCounts.Selesai}</p>
          </div>
        </div>
      </div>
      <div className="cardContainer flex flex-wrap justify-center gap-8 mt-6 mb-20">
        {dataUser.isAdmin === true
          ? semuaData
              .filter((laporan) => laporan.Provinsi === dataUser.username) // Additional filtering
              .filter((laporan) => {
                if (filter === "Semua") return true;
                if (filter === "Belum Ditindaklanjut") {
                  return laporan.StatusSekarang === ""; // Filter for "Belum Ditindaklanjut"
                }
                return laporan.StatusSekarang === filter;
              }) // Filter based on status
              .map((item, index) => {
                return <CardLaporanSaya filter={filter} itemData={item} fetchAgain={fetchLaporan} key={index} />;
              })
          : semuaData
              .filter((laporan) => laporan.PemilikID === user?._id) // Additional filtering
              .filter((laporan) => {
                if (filter === "Semua") return true;
                if (filter === "Belum Ditindaklanjut") {
                  return laporan.StatusSekarang === ""; // Filter for "Belum Ditindaklanjut"
                }
                return laporan.StatusSekarang === filter;
              }) // Filter based on status
              .map((item, index) => {
                return <CardLaporanSaya filter={filter} itemData={item} fetchAgain={fetchLaporan} key={index} />;
              })}
      </div>
    </section>
  );
};

export default MainLaporanSaya;
