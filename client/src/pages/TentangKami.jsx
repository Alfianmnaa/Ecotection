import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import HeroTentang from "../components/TentangKami/HeroTentang";
import TentangSec1 from "../components/TentangKami/TentangSec1";
import TentangSec2 from "../components/TentangKami/TentangSec2";

const TentangKami = () => {
  return (
    <>
      <Navbar />
      <HeroTentang />
      <TentangSec1 />
      <TentangSec2 />
    </>
  );
};

export default TentangKami;
