import React from "react";
import HeroEdit from "../components/Profile/HeroEdit";
import { Navbar2 } from "../components/Navbar/Navbar2";
import MainEdit from "../components/Profile/MainEdit";

const ProfileEdit = () => {
  return (
    <>
      <Navbar2 />
      <HeroEdit />
      <MainEdit />
    </>
  );
};

export default ProfileEdit;
