import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import check1 from "../../assets/DetilLaporan/check1.svg";
import check2 from "../../assets/DetilLaporan/check2.svg";
import check3 from "../../assets/DetilLaporan/check3.svg";

const DetilKanan = () => {
  const [statusLaporan, setStatusLaporan] = useState([]);
  const path = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(`/status/${path}`);
        setStatusLaporan(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatus();
  }, []);

  console.log(statusLaporan);

  return (
    <div>
      <div className="cardKu border-[1px] border-inputBorder 2xl:max-w-[510px] md:max-w-[420px] max-w-full md:rounded-3xl rounded-2xl ">
        <div className="p-10">
          <h6 className="text-normal font-bold text-center">PROSES LAPORAN</h6>
          <br />
          <hr />
          <br />
          <div className="flex items-center gap-4 my-4">
            {statusLaporan?.StatusPertama && <img src={check1} alt="check1" />}
            <div>
              <p className="text-[#0084FF] font-semibold md:text-body text-normal">{statusLaporan?.StatusPertama || ""}</p>
              <p className="text-[#5B5B5B] font-bold sm:text-smallText text-verySmallText ">Pemerintah {statusLaporan?.PemProv || ""}</p>
              <p className="text-[#222] font-medium sm:text-smallText text-verySmallText ">{statusLaporan?.DeskripsiPertama || ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={check2} alt="check1" />
            <div>
              <p className="text-[#C9AE17] font-semibold md:text-body text-normal">Diverifikasi</p>
              <p className="text-[#8A8A8A] font-medium] sm:text-smallText text-verySmallText ">Rabu, 24 Januari 2024 · 08:24 WIB</p>
              <p className="text-[#5B5B5B] font-bold sm:text-smallText text-verySmallText ">PEMERINTAH KOTA BOGOR</p>
              <p className="text-[#222] font-medium sm:text-smallText text-verySmallText ">Baik kak, akan kami cek dan koordinasikan dengan dinas kehutanan</p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={check3} alt="check1" />
            <div>
              <p className="text-[#53A88C] font-semibold md:text-body text-normal">Diverifikasi</p>
              <p className="text-[#8A8A8A] font-medium] sm:text-smallText text-verySmallText ">Rabu, 24 Januari 2024 · 08:24 WIB</p>
              <p className="text-[#5B5B5B] font-bold sm:text-smallText text-verySmallText ">PEMERINTAH KOTA BOGOR</p>
              <p className="text-[#222] font-medium sm:text-smallText text-verySmallText ">Baik kak, akan kami cek dan koordinasikan dengan dinas kehutanan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetilKanan;
