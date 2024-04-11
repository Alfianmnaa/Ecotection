import React from "react";
import HeroStats from "../components/Statistik/HeroStats";
import StatsSec2 from "../components/Statistik/StatsSec2";
import StatsSec3 from "../components/Statistik/StatsSec3";
import { Navbar2 } from "../components/Navbar/Navbar2";

const Statistik = () => {
  return (
    <>
      <Navbar2 />
      <HeroStats />
      <StatsSec2 />
      <StatsSec3 />
    </>
  );
};

export default Statistik;
