import { React, useContext, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda";
import Laporkan from "./pages/Laporkan";
import Laporan from "./pages/Laporan";
import Statistik from "./pages/Statistik";
import TentangKami from "./pages/TentangKami";
import Footer from "./components/Footer/Footer";
import ArrowUp from "./assets/Beranda/ArrowUp.svg";
import { ScrollToTop } from "react-router-scroll-to-top";
import Daftar from "./pages/Daftar";
import Masuk from "./pages/Masuk";
import { UserContextProvider } from "./context/UserContext";
import DetilLaporan from "./pages/DetilLaporan";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileLaporan from "./pages/ProfileLaporan";

function App() {
  const scrollRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        if (window.scrollY > 580) {
          scrollRef.current.style.display = "flex";
        } else {
          scrollRef.current.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/daftar" element={<Daftar />} />
              <Route path="/masuk" element={<Masuk />} />
              <Route path="/laporkan" element={<Laporkan />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="/laporan/:id" element={<DetilLaporan />} />
              <Route path="/statistik" element={<Statistik />} />
              <Route path="/tentang" element={<TentangKami />} />
              <Route path="/edit-profil" element={<ProfileEdit />} />
              <Route path="/laporan-saya" element={<ProfileLaporan />} />
            </Routes>
            <Footer />
          </ScrollToTop>
        </BrowserRouter>
      </UserContextProvider>
      <a
        href="#header"
        id="scroll-up"
        onClick={scrollToTop}
        ref={scrollRef}
        className="scrollup fixed w-12 h-12 justify-center items-center border border-white text-white bg-greenMain bottom-[80px] right-[30px] text-center cursor-pointer"
        style={{
          zIndex: "9999",
          borderRadius: "50%",
          lineHeight: "40px",
          display: "none", // sembunyikan secara default
        }}
      >
        <img src={ArrowUp} alt="ArrowUp" className="w-8" />
      </a>
    </>
  );
}

export default App;
