import React from "react";
import logowhite from "../../assets/Navbar/LogoWhite.svg";
import FBLogo from "../../assets/Footer/FBLogo.svg";
import IGLogo from "../../assets/Footer/IGLogo.svg";
import XLogo from "../../assets/Footer/XLogo.svg";
import YtbLogo from "../../assets/Footer/YtbLogo.svg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[rgb(18,18,18)] py-20 md:px-40 sm:px-30 px-14">
        <div className="flex flex-wrap gap-4 justify-between ">
          <div>
            <p className="font-extrabold text-white my-3">CONTACT US</p>
            <div className="flex items-center gap-4 text-[#9C9C9C] font-semibold mb-3">
              <FaPhoneAlt className="text-2xl" />
              <span>+6281326022762</span>
            </div>
            <a href="mailto:alfianmna@gmail.com" target="blank">
              <div className="flex items-center gap-3 text-[#9C9C9C] font-semibold">
                <IoMdMail className="text-3xl" />
                <span>alfianmna@gmail.com</span>
              </div>
            </a>
          </div>
          <div>
            <p className="font-extrabold text-white my-3">ECOTECTION</p>

            <div className="text-[#9C9C9C] font-semibold cursor-pointer">
              <Link to="/">
                <p className="mb-3">Beranda</p>
              </Link>
              <Link to="/laporkan">
                <p className="mb-3">Laporkan</p>
              </Link>
              <Link to="/laporan">
                <p className="mb-3">Laporan</p>
              </Link>
              <Link to="/statistik">
                <p className="mb-3">Statistik</p>
              </Link>
              <Link to="/tentang">
                <p className="mb-3">Tentang Kami</p>
              </Link>
            </div>
          </div>
          <div>
            <p className="font-extrabold text-white my-3">SOSIAL MEDIA</p>
            <Link to="https://www.instagram.com/alfianmnaa/" target="_blank">
              <div className="flex gap-4">
                <img src={FBLogo} alt="FBLogo" />
                <img src={IGLogo} alt="IGLogo" />
                <img src={XLogo} alt="XLogo" />
                <img src={YtbLogo} alt="YtbLogo" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#121212] md:px-40 sm:px-20 px-14 py-10 flex flex-wrap justify-between gap-4 border-t-[0.1px] border-[#9C9C9C]">
        <div className="flex items-center gap-4 text-[#9C9C9C]">
          <img src={logowhite} alt="EcoLogo" />
          <span>Ecotection</span>
        </div>
        <p className="text-[#9C9C9C] text-center">Copyright © 2024 Ecotection. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
