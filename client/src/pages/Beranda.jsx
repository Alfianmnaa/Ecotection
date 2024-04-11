import React from "react";
import HeroBeranda from "../components/Beranda/HeroBeranda";
import Berandasec1 from "../components/Beranda/Berandasec1";
import Berandasec2 from "../components/Beranda/Berandasec2";
import Berandasec3 from "../components/Beranda/Berandasec3";
import { Navbar } from "../components/Navbar/Navbar";
import Berandasec4 from "../components/Beranda/Berandasec4";
import Berandasec5 from "../components/Beranda/Berandasec5";

const Beranda = () => {
  return (
    <>
      <Navbar />
      <HeroBeranda />
      <Berandasec1 />
      <Berandasec2 />
      <Berandasec3 />
      <Berandasec4 />
      <Berandasec5 />
    </>
  );
};

export default Beranda;
