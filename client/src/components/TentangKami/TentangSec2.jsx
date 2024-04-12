import React from "react";
import LawanImg from "../../assets/Beranda/lawan.png";

const TentangSec2 = () => {
  return (
    <section>
      <div className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-10">
        <div className="flex flex-wrap justify-between">
          <img src={LawanImg} alt="sec1_pic" className="mt-2 2xl:w-[450px] lg:w-[400px] md:w-full lg:h-[340px] h-auto object-cover rounded-3xl mb-4" />{" "}
          <div className="2xl:w-[480px] lg:w-[400px] md:mb-2 mb-3">
            <h3 className="2xl:text-5xl lg:text-4xl text-3xl font-extrabold  sm:mb-5 mb-3">Mari Berkolaborasi Melestarikan Alam!</h3>
            <p className="2xl:text-body lg:text-[18px] text-normal font-medium ">
              Dengan bergabung bersama Ecotection, Anda memiliki kesempatan untuk turut serta dalam upaya melindungi dan melestarikan alam Indonesia. Jadilah bagian dari kami sekarang dan berikan kontribusi nyata untuk masa depan lingkungan
              yang lebih baik!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangSec2;
