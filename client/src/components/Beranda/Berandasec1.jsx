import React from "react";
import BerandaSecOneImg from "../../assets/Beranda/BerandaSec1.png";

const Berandasec1 = () => {
  return (
    <section>
      <div className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-10">
        <div className="flex flex-wrap justify-between">
          <div className="2xl:w-[480px] lg:w-[400px] md:mb-2 mb-3">
            <h3 className="2xl:text-5xl lg:text-4xl text-3xl font-extrabold  sm:mb-5 mb-3">
              Apa itu <span className="text-greenSecondary">Ecotection?</span>
            </h3>
            <p className="2xl:text-body lg:text-[18px] text-normal font-medium ">
              Ecotection adalah platform online yang menghubungkan masyarakat dengan alam. Kami menyediakan platform bagi masyarakat untuk melaporkan kerusakan alam dan mendukung upaya pelestarian alam.
            </p>
          </div>
          <img src={BerandaSecOneImg} alt="sec1_pic" className="mt-2 2xl:w-[450px] lg:w-[400px] md:w-full lg:h-[340px] h-auto object-cover rounded-3xl" />{" "}
        </div>
      </div>
    </section>
  );
};

export default Berandasec1;
