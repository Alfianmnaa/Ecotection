import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logowhite from "../../assets/Navbar/LogoWhite.svg";
import logo from "../../assets/Navbar/Logo.svg";
import kosong from "../../assets/Navbar/kosong.jpeg";
import news from "../../assets/Navbar/news.svg";
import person_edit from "../../assets/Navbar/person_edit.svg";
import logout from "../../assets/Navbar/logout.svg";
import menuPutih from "../../assets/Navbar/menuPutih.svg";
import menuHitam from "../../assets/Navbar/menuHitam.svg";
import close from "../../assets/Navbar/close.svg";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../config";

export const Navbar = () => {
  const [dataUser, setDataUser] = useState([]);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
  // Handle scroll
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navLinks = [
    { to: "/", text: "Beranda" },
    { to: "/laporkan", text: "Laporkan" },
    { to: "/laporan", text: "Laporan" },
    { to: "/statistik", text: "Statistik" },
    { to: "/tentang", text: "Tentang Kami" },
  ];

  const navbarClasses = `w-full absolute top-0 z-50 ${scrolling ? "bg-white text-black shadow-sm sticky top-0" : "text-white bg-transparent"}`;
  const buttonMasuk = `hover:brightness-90 duration-150 w-[95px] h-[51px] px-6 py-4 rounded-[30px] border ${scrolling ? "border-black text-black" : "border-white text-white"} justify-center items-center gap-2.5 inline-flex`;

  const buttonDaftar = `hover:brightness-90 hover:border duration-150 w-[95px] h-[51px] px-6 py-4 ${scrolling ? "bg-greenMain text-white" : "bg-white text-black"}  rounded-[30px] justify-center items-center gap-2.5 inline-flex`;
  const settingProfile = `${scrolling ? "text-black" : "text-white"} 2xl:text-xl text-smallText font-semibold sm:block hidden`;
  // Fungsi untuk memeriksa apakah link sesuai dengan path URL saat ini
  const isLinkActive = (path) => (path === "/" ? location.pathname === path : location.pathname.startsWith(path));

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/masuk");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className={navbarClasses}>
      <nav className=" 2xl:py-6 md:py-3 py-1 px-2 h-full flex justify-between items-center">
        <div className="logo  ml-5 flex items-center py-3  ">
          <Link to="/" className="w-40 sm:w-64 flex justify-center items-center gap-3">
            <img src={scrolling ? logo : logowhite} className="w-10  object-cover" alt="logo" />
            <span className="text-body font-black">Ecotection</span>
          </Link>
        </div>
        <div className="nav-kiri lg:w-[750px] sm:w-[700px] hidden font-semibold text-normal lg:ml-14 sm:ml-3  min-[920px]:flex justify-start items-center">
          <Link to="/" className={`ml-4 ${isLinkActive("/") ? "text-yellowMain" : ""}`}>
            Beranda
          </Link>
          <Link to="/laporkan" className={`ml-4 ${isLinkActive("/laporkan") ? "text-yellowMain" : ""}`}>
            Laporkan
          </Link>
          <Link to="/laporan" className={`ml-4 ${isLinkActive("/laporan") ? "text-yellowMain" : ""}`}>
            Laporan
          </Link>
          <Link to="/statistik" className={`ml-4 ${isLinkActive("/statistik") ? "text-yellowMain" : ""}`}>
            Statistik
          </Link>
          <Link to="/tentang" className={`ml-4 ${isLinkActive("/tentang") ? "text-yellowMain" : ""}`}>
            Tentang Kami
          </Link>
        </div>

        <div className="font-semibold text-normal ">
          {user ? (
            <div className="relative inline-block" ref={dropdownRef}>
              <div className=" flex justify-start items-center gap-3 cursor-pointer hover:brightness-95 duration-100 mr-6" onClick={() => setShowDropdown(!showDropdown)}>
                <img className="sm:w-[60px] sm:h-[60px] w-12 h-12 object-cover rounded-full border-2 border-white" src={dataUser?.fotoPengguna ? dataUser?.fotoPengguna : kosong} alt="Profile" />
                <div className={settingProfile}>{user.username}</div>
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-4 sm:w-56 w-52 bg-white rounded-md shadow-lg z-10">
                  <div className="pt-5 pb-1">
                    <div className="md:text-normal text-smallText px-4 mb-2">
                      <p className="text-black font-semibold">{user.username}</p>
                      <p className="text-[#8A8A8A]">{user.email}</p>
                    </div>
                    <hr />
                    <Link to="/laporan-saya">
                      <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                        <img src={news} alt="news" className="md:w-7 w-5" />
                        <p className="font-semibold md:text-normal text-smallText ">Laporan Saya</p>
                      </div>
                    </Link>
                    <Link to="/edit-profil">
                      <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                        <img src={person_edit} alt="news" className="md:w-7 w-5" />
                        <p className="font-semibold md:text-normal text-smallText ">Edit Profile</p>
                      </div>
                    </Link>
                    <div className="text-[#B3261E] flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2" onClick={handleLogout}>
                      <img src={logout} alt="news" className="md:w-7 w-5" />
                      <p className="font-semibold md:text-normal text-smallText">Keluar</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex mr-10 max-[920px]:hidden">
              <Link to="/masuk" className="ml-4">
                <div className={buttonMasuk}>
                  <div className="text-base font-semibold ">Masuk</div>
                </div>
              </Link>
              <Link to="/daftar" className="ml-4">
                <div className={buttonDaftar}>
                  <div className="text-base font-semibold  ">Daftar</div>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="hamburger">
          {scrolling ? (
            <img
              src={menuHitam}
              alt="menuWhite"
              className=" ml-3 mr-3 min-[920px]:hidden"
              onClick={() => {
                setShowMobileNav(!showMobileNav);
              }}
            />
          ) : (
            <img
              src={menuPutih}
              alt="menuWhite"
              className=" ml-3 mr-3 min-[920px]:hidden"
              onClick={() => {
                setShowMobileNav(!showMobileNav);
              }}
            />
          )}
        </div>
        {/* Mobile Nav */}
        <div className={`bg-white shadow-sm pb-8 fixed top-0 inset-x-0 h-full z-50 transform ${showMobileNav ? "translate-x-0" : "-translate-x-[109%]"} transition-transform duration-300 ease-in-out min-[920px]:hidden`}>
          {/* Close icon or back button could be placed here */}
          <img src={close} alt="close" className="text-gray-400 mt-10 mr-3 w-4 h-4 absolute right-3" onClick={() => setShowMobileNav(false)} />
          <div className="overflow-hidden nav-kiri mt-20 sm:text-body text-normal flex flex-col items-center ">
            {!user && (
              <div className="bg-[#E2FFF5] w-full py-6 mb-4">
                <div className="flex flex-col justify-center items-center gap-3 ">
                  <Link to="/masuk" className="ml-4">
                    <div className="hover:brightness-90 duration-150 max-w-[95px] max-h-[51px] md:px-6 md:py-4 px-5 py-3 rounded-[30px] border border-black text-black justify-center items-center gap-2.5 inline-flex">
                      <div className="text-base font-semibold ">Masuk</div>
                    </div>
                  </Link>
                  <Link to="/daftar" className="ml-4">
                    <div className="hover:brightness-90 hover:border duration-150 max-w-[95px] max-h-[51px] md:px-6 md:py-4 px-5 py-3 bg-greenMain text-white rounded-[30px] justify-center items-center gap-2.5 inline-flex">
                      <div className="text-base font-semibold  ">Daftar</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {navLinks.map((link, index) => (
              <Link key={index} to={link.to} className="text-black mb-4 duration-100 hover:brightness-90" onClick={() => setShowMobileNav(false)}>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
