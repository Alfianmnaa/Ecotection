import React, { useContext, useEffect, useState } from "react";
import fotoProfile from "../../assets/Navbar/kosong.jpeg";
import heroLaporanMasyarakat from "../../assets/Pengaturan/sahabat_bumi.png";
import editIcon from "../../assets/Pengaturan/edit.svg";
import keyIcon from "../../assets/Pengaturan/key.svg";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../config";

const HeroEdit = () => {
  const { user } = useContext(UserContext);
  const [handleMenu, setHandleMenu] = useState("");
  const [dataUser, setDataUser] = useState("");

  useEffect(() => {
    fetchUser();
  }, [user]);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/user/${user._id}`);
      setDataUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const styleMenuProfil = `flex items-center cursor-pointer ${handleMenu == "" ? "text-greenSecondary border-b-2 border-greenSecondary" : "text-black"}`;
  const styleMenuPassword = `flex items-center cursor-pointer ${handleMenu == "Ubah Password" ? "text-greenSecondary border-b-2 border-greenSecondary" : "text-black"}`;

  return (
    <section>
      <div className="w-full 2xl:h-[460px] md:h-[340px] h-[300px] bg-no-repeat bg-top bg-cover" style={{ backgroundImage: `url(${heroLaporanMasyarakat})` }}>
        <div className="text-white lg:translate-y-32 translate-y-28 text-center">
          <h4 className="font-black sm:mr-[60px] ml-0 opacity-90 lg:text-4xl md:text-3xl text-2xl text-[#FCDC2A]">SELAMAT DATANG</h4>
          <h4 className="font-black sm:mr-[60px] ml-0 opacity-90 lg:text-4xl md:text-3xl text-2xl text-[#FCDC2A] mb-4">{dataUser.isAdmin == true ? "PENYELAMAT" : "SAHABAT"} BUMI</h4>
          <span className="sm:mr-[60px] ml-0 text-verySmallText font-light px-3 py-2 border-[1px] border-inputBorder rounded-md">ECOTECTION.</span>
        </div>
      </div>
      <div className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4">
        <div className=" flex items-center justify-between sm:translate-y-[-120px] translate-y-[-100px]">
          <div>
            <img src={dataUser.fotoPengguna || fotoProfile} alt="fotoProfile" className="sm:mb-8 mb-4 sm:w-40 sm:h-40 w-32 h-32 rounded-full border-2 border-white" />
            <p className="sm:text-[32px] text-subheadline font-extrabold">{dataUser.username}</p>
            <p className="sm:text-subheadline text-normal  font-medium">{dataUser.jumlahLaporan || 0} laporan</p>
          </div>
          <button className="flex item-center justify-center gap-1 border-[1px] border-black sm:py-3 sm:px-4 py-2 px-3 rounded-[50px] mt-20 ">
            <img src={editIcon} alt="editIcon" className="w-6" />
            <span className="text-normal font-semibold">Edit Profile</span>
          </button>
        </div>
        <div className=" translate-y-[-40px] border-b-2 border-[#B0B0B0]">
          <div className="flex items-center md:gap-12 gap-6 sm:text-body text-normal font-semibold mb-10">
            <div className={styleMenuProfil} onClick={() => setHandleMenu("")}>
              <img src={editIcon} alt="newsIcon" className="md:w-6 w-5 mr-2" />
              <p>Edit Profil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroEdit;
