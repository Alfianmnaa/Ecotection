import React from "react";
import SampahBeranda from "../../assets/Beranda/Sampah.png";
import PencemaranBeranda from "../../assets/Beranda/Pencemaran.png";
import EksploitasiHewan from "../../assets/Beranda/EksploitasiHewan.png";
import PerusakanBeranda from "../../assets/Beranda/PerusakanLingkungan.png";

const Berandasec3 = () => {
  const JenisKegiatan = [
    {
      jenisPic: SampahBeranda,
      judul: "Sampah",
    },
    {
      jenisPic: PencemaranBeranda,
      judul: "Pencemaran",
    },
    {
      jenisPic: EksploitasiHewan,
      judul: "Eksploitasi Hewan",
    },
    {
      jenisPic: PerusakanBeranda,
      judul: "Perusakan Lingkungan",
    },
  ];
  return (
    <section>
      <div className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-6 2xl:py-44 lg:py-32 md:py-28 sm:py-20 py-8 bg-[#E2FFF5]">
        <h1 className="2xl:text-5xl sm:text-4xl text-3xl font-extrabold text-center sm:leading-relaxed leading-normal">Jenis Kegiatan yang Bisa Anda Laporkan</h1>
        <div className="text-white flex flex-wrap justify-center gap-6 mt-10 ">
          {JenisKegiatan.map((kegiatan, index) => {
            return (
              <div className="2xl:h-[264px] 2xl:w-[264px] xl:w-[220px] xl:h-[220px] w-[280px] h-[280px]  bg-cover flex justify-center items-end" style={{ backgroundImage: `url(${kegiatan.jenisPic})` }} key={index}>
                <p className="2xl:text-2xl lg:text-body text-[18px]  font-extrabold mb-6 text-center px-4">{kegiatan.judul}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Berandasec3;
