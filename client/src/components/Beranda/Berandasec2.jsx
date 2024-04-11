import React from "react";
import BerandaSectwoImg from "../../assets/Beranda/BerandaSec2.png";
import target from "../../assets/Beranda/icon/target.svg";
import listMisi from "../../assets/Beranda/icon/listMisi.svg";

const Berandasec2 = () => {
  const misi = [
    {
      text: "Memberdayakan masyarakat untuk melaporkan kerusakan alam.",
    },
    {
      text: "Mendukung upaya pelestarian alam.",
    },
    {
      text: "Meningkatkan kesadaran masyarakat tentang pentingnya menjaga lingkungan.",
    },
  ];

  return (
    <section>
      <div>
        <div className="bg-greenMain xl:px-36 lg:px-32 md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-20">
          <div className="flex flex-wrap justify-between">
            <img src={BerandaSectwoImg} alt="sec1_pic" className="mt-2 2xl:w-[450px] lg:w-[400px] md:w-full h-auto object-cover rounded-3xl" />{" "}
            <div className="text-white lg:w-[480px] md:mt-4 mt-6  ml-8">
              <h3 className="flex items-center sm:gap-8 gap-2 2xl:text-5xl lg:text-4xl font-extrabold text-3xl sm:mb-5 mb-3">
                <span>Misi Kami</span> <img src={target} alt="target" className="w-10" />
              </h3>
              <div className="translate-x-[-20px] 2xl:text-body lg:text-[18px] text-normal">
                {misi.map((item, index) => {
                  return (
                    <p key={index} className="flex items-baseline font-medium mb-2 ">
                      <img src={listMisi} alt="listMisi" /> <span className="ml-2 ">{item.text}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Berandasec2;
