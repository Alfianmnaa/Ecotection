import React, { useState } from "react";
import arrowDown from "../../assets/Laporkan/arrowDown.svg";
import Indonesia from "./dataProvinsi";

const SelectFormLaporkan = ({ onSelectData }) => {
  const [isOpenKategori, setIsOpenKategori] = useState(false);
  const [isOpenProvinsi, setIsOpenProvinsi] = useState(false);
  const [isOpenKabupaten, setIsOpenKabupaten] = useState(false);
  const [isOpenJenis, setIsOpenJenis] = useState(false);
  const [kategoriDipilih, setKategoriDipilih] = useState("");
  const [provinsiDipilih, setProvinsiDipilih] = useState("");
  const [kabupatenDipilih, setKabupatenDipilih] = useState("");
  const [jenisLaporanDipilih, setJenisLaporanDipilih] = useState("");

  // Individual handleSelect functions for each component
  const handleKategoriSelect = (option) => {
    setKategoriDipilih(option);
    onSelectData({
      JenisKerusakan: option,
      Provinsi: provinsiDipilih,
      Kabupaten: kabupatenDipilih,
      JenisLaporan: jenisLaporanDipilih,
    });
  };

  const handleProvinsiSelect = (option) => {
    setProvinsiDipilih(option);
    onSelectData({
      JenisKerusakan: kategoriDipilih,
      Provinsi: option,
      Kabupaten: kabupatenDipilih,
      JenisLaporan: jenisLaporanDipilih,
    });
  };

  const handleKabupatenSelect = (option) => {
    setKabupatenDipilih(option);
    onSelectData({
      JenisKerusakan: kategoriDipilih,
      Provinsi: provinsiDipilih,
      Kabupaten: option,
      JenisLaporan: jenisLaporanDipilih,
    });
  };

  const handleJenisLaporanSelect = (option) => {
    setJenisLaporanDipilih(option);
    onSelectData({
      JenisKerusakan: kategoriDipilih,
      Provinsi: provinsiDipilih,
      Kabupaten: kabupatenDipilih,
      JenisLaporan: option,
    });
  };
  return (
    <>
      <div className="mt-8">
        <label htmlFor="deskripsiLaporan">
          <p className="md:text-body text-normal font-semibold py-3">Kategori Laporan</p>
        </label>
        <div className="relative">
          <div className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 text-gray-500 shadow-sm focus:outline-none" onClick={() => setIsOpenKategori(!isOpenKategori)}>
            {kategoriDipilih || "Pilih Kategori Laporan"}
            <img src={arrowDown} alt="arrowDown" className="ml-2" />
          </div>
          {isOpenKategori && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md" onClick={() => setIsOpenKategori(false)}>
              <ul className="p-2">
                <li className="cursor-pointer hover:bg-gray-100" onClick={() => handleKategoriSelect("Sampah")}>
                  Sampah
                </li>
                <li className="cursor-pointer hover:bg-gray-100" onClick={() => handleKategoriSelect("Pencemaran")}>
                  Pencemaran
                </li>
                <li className="cursor-pointer hover:bg-gray-100" onClick={() => handleKategoriSelect("Eksploitasi Hewan")}>
                  Eksploitasi Hewan
                </li>
                <li className="cursor-pointer hover:bg-gray-100" onClick={() => handleKategoriSelect("Perusakan Lingkungan")}>
                  Perusakan Lingkungan
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="deskripsiLaporan">
          <p className="md:text-body text-normal font-semibold py-3">Provinsi</p>
        </label>
        <div className="relative">
          <div className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 text-gray-500 shadow-sm focus:outline-none" onClick={() => setIsOpenProvinsi(!isOpenProvinsi)}>
            {provinsiDipilih || "Pilih Kategori Laporan"}
            <img src={arrowDown} alt="arrowDown" className="ml-2" />
          </div>
          {isOpenProvinsi && (
            <div className="absolute z-50 max-h-96 overflow-y-scroll w-full mt-1 bg-white shadow-lg rounded-md" onClick={() => setIsOpenProvinsi(false)}>
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
      </div>
      {provinsiDipilih && (
        <div className="mt-4">
          <label htmlFor="deskripsiLaporan">
            <p className="md:text-body text-normal font-semibold py-3">Kabupaten</p>
          </label>
          <div className="relative">
            <div className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 text-gray-500 shadow-sm focus:outline-none" onClick={() => setIsOpenKabupaten(!isOpenKabupaten)}>
              {kabupatenDipilih || "Pilih Kabupaten"}
              <img src={arrowDown} alt="arrowDown" className="ml-2" />
            </div>
            {isOpenKabupaten && (
              <div className="absolute z-20 max-h-64 overflow-y-scroll w-full mt-1 bg-white shadow-lg rounded-md" onClick={() => setIsOpenKabupaten(false)}>
                <ul className="p-2 ">
                  {Indonesia.find((provinsi) => provinsi.namaProvinsi === provinsiDipilih).kabupatenKota.map((kabupaten, index) => (
                    <li key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => handleKabupatenSelect(kabupaten)}>
                      {kabupaten}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-4">
        <label htmlFor="deskripsiLaporan">
          <p className="md:text-body text-normal font-semibold py-3">Jenis Laporan</p>
        </label>
        <div className="relative">
          <div className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 text-gray-500 shadow-sm focus:outline-none" onClick={() => setIsOpenJenis(!isOpenJenis)}>
            {jenisLaporanDipilih || "Pilih Jenis Laporan"}
            <img src={arrowDown} alt="arrowDown" className="ml-2" />
          </div>
          {isOpenJenis && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md" onClick={() => setIsOpenJenis(false)}>
              <ul className="p-2">
                <li className="cursor-pointer hover:bg-gray-100" onClick={() => handleJenisLaporanSelect("Public")}>
                  Public
                </li>
                <li className="cursor-pointer hover:bg-gray-100" onClick={() => handleJenisLaporanSelect("Private")}>
                  Private
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectFormLaporkan;
