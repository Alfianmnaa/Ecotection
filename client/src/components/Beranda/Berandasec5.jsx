import React from "react";
import BerandaSecOneImg from "../../assets/Beranda/BerandaSec1.png";
import ArrowSec5 from "../../assets/Beranda/icon/ArrowSec5.svg";
import { Link } from "react-router-dom";

const Berandasec5 = () => {
  return (
    <section>
      <div className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-10 lg:py-40 md:py-15 sm:py-10 py-10">
        <div className="flex flex-wrap justify-between">
          <div className="2xl:w-[480px] lg:w-[400px] md:mb-2 mb-3">
            <h3 className="leading-normal 2xl:text-5xl lg:text-4xl text-3xl font-extrabold sm:mb-5 mb-3">
              Mari Bersama <span className="text-greenSecondary">Lawan</span> Kerusakan Alam
            </h3>
            <p className="2xl:text-body lg:text-[18px] text-normal font-medium ">Alam adalah rumah bagi kita semua. Melindunginya adalah tanggung jawab kita bersama. Laporkan tindakan merusak alam yang Anda temukan melalui Ecotection.</p>
            <Link to="/laporkan">
              <button className="text-white bg-greenMain hover:brightness-90  duration-150 sm:w-[280px] w-[220px] sm:px-6 sm:py-4 px-4 py-2  border-2 border-greeMain rounded-[30px] md:text-normal text-smallText mt-4">
                <div className="flex items-center justify-center">
                  <span className="font-semibold ">Laporkan sekarang</span> <img src={ArrowSec5} alt="arrowhero" className="text-2xl sm:ml-4 ml-2" />
                </div>
              </button>
            </Link>
          </div>
          <img src={BerandaSecOneImg} alt="sec5_pic" className="max-w-full h-auto object-cover" />{" "}
        </div>
      </div>
    </section>
  );
};

export default Berandasec5;
