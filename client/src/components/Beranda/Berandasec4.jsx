import React from "react";
import HematAir from "../../assets/Beranda/Section4/HematAir.png";
import HematEnergi from "../../assets/Beranda/Section4/HematEnergi.png";
import KurangiSampah from "../../assets/Beranda/Section4/KurangiSampah.png";
import PilahSampah from "../../assets/Beranda/Section4/PilahSampah.png";
import TanamPohon from "../../assets/Beranda/Section4/TanamPohon.png";
import LaporkanTindakan from "../../assets/Beranda/Section4/LaporkanTindakan.png";

const Berandasec4 = () => {
  const LindungiAlam = [
    {
      CaraMelindungi: HematEnergi,
      Judul: "Hemat Energi",
      Deskripsi: "Matikan lampu dan peralatan elektronik saat tidak digunakan.",
    },
    {
      CaraMelindungi: HematAir,
      Judul: "Hemat Air",
      Deskripsi: "Gunakan air secukupnya saat mencuci piring dan baju.",
    },
    {
      CaraMelindungi: KurangiSampah,
      Judul: "Kurangi Sampah Plastik",
      Deskripsi: "Gunakan air secukupnya saat mencuci piring dan baju",
    },
    {
      CaraMelindungi: PilahSampah,
      Judul: "Pilah sampah",
      Deskripsi: "Pisahkan sampah organik dan anorganik.",
    },
    {
      CaraMelindungi: TanamPohon,
      Judul: "Tanam Pohon",
      Deskripsi: "Tanam pohon di halaman rumah atau lingkungan sekitar. ",
    },

    {
      CaraMelindungi: LaporkanTindakan,
      Judul: "Laporkan tindakan merusak alam",
      Deskripsi: "Laporkan pencemaran, perusakan lingkungan, dan eksploitasi hewan melalui Ecotection .",
    },
  ];
  return (
    <section>
      <div className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-6 lg:py-20 md:py-15 sm:py-10 py-8">
        <h1 className="2xl:text-5xl sm:text-4xl text-3xl font-extrabold text-center sm:leading-relaxed leading-normal">Bagaimana Cara Melindungi Alam Kita?</h1>
        <div className="flex justify-center items-center">
          <p className="text-center text-[#114232] font-medium max-w-[840px] 2xl:text-body md:text-[18px] text-normal md:my-6 my-2 ">
            Alam adalah rumah bagi kita semua. Melindunginya adalah tanggung jawab kita bersama. Yuk, lakukan langkah kecil untuk menjaga kelestarian alam:
          </p>
        </div>
        <div className="text-white flex flex-wrap justify-center gap-6 mt-10 ">
          {LindungiAlam.map((cara, index) => {
            return (
              <div className="2xl:h-[360px] 2xl:w-[360px] xl:w-[320px] xl:h-[320px] w-[280px] h-[280px]  bg-cover flex justify-center items-end" style={{ backgroundImage: `url(${cara.CaraMelindungi})` }} key={index}>
                <div className="2xl:px-0 px-4 py-6 max-w-[280px]">
                  <p className="2xl:text-2xl lg:text-body text-[18px] font-extrabold mb-2">{cara.Judul}</p>
                  <p className="max-w-280px 2xl:text-normal text-smallText">{cara.Deskripsi}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Berandasec4;
