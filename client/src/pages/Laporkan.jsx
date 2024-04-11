import React from "react";
import Faq from "../components/Laporkan/Faq";
import HeroLaporkan from "../components/Laporkan/HeroLaporkan";
import FormLaporkan from "../components/Laporkan/FormLaporkan";
import LaporkanSec3 from "../components/Laporkan/LaporkanSec3";
import { Navbar } from "../components/Navbar/Navbar";

const Laporkan = () => {
  return (
    <>
      <Navbar />
      <HeroLaporkan />
      <FormLaporkan />
      <LaporkanSec3 />
      <Faq />
    </>
  );
};

export default Laporkan;
