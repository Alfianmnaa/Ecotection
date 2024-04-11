import React from "react";
import LaporkanSec3Img from "../../assets/Laporkan/LaporkanSec3.png";

const LaporkanSec3 = () => {
  return (
    <section>
      <div className="2xl:translate-y-[-420px]  translate-y-[-120px]">
        <div className="w-full h-[424px] bg-cover bg-left bg-no-repeat flex items-center" style={{ backgroundImage: `url(${LaporkanSec3Img})`, backgroundPosition: "70% center" }}>
          <p className="text-white lg:px-36 md:px-16 sm:px-12 px-10 lg:leading-normal md:leading-normal font-medium 2xl:text-3xl  sm:text-[24px] text-[18px] 2xl:max-w-[1000px] max-w-[880px]">
            Kerusakan alam adalah masalah serius yang harus kita atasi bersama. Dengan melaporkan tindakan merusak alam, Anda membantu menciptakan perubahan positif dan melindungi lingkungan untuk generasi mendatang. Ecotection menyediakan
            platform yang mudah dan aman untuk melaporkan kerusakan alam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LaporkanSec3;
