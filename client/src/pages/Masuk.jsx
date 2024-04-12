import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mataBuka from "../assets/Login/mataBuka.svg";
import mataTutup from "../assets/Login/mataTutup.svg";
import { MdLogin } from "react-icons/md";
import { Navbar2 } from "../components/Navbar/Navbar2";
import { UserContext } from "../context/UserContext";
import { axiosInstance } from "../config";

const Masuk = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClosed, setIsClosed] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMasuk = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { username, password }, { withCredentials: true });
      setUser(res.data);
      console.log("login success");
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const toggleEye = () => {
    setIsClosed(!isClosed);
  };
  return (
    <>
      <Navbar2 />
      <main>
        <div className="container-login md:py-[120px] py-[100px] ">
          <div className="sm:w-[550px] w-[300px] mx-auto">
            <h1 className="flex items-center sm:gap-4 gap-0 sm:justify-center justify-end text-[32px] font-bold">
              <MdLogin className="text-5xl sm:mx-0 mx-4" />
              <div>
                Masuk ke <span className="text-greenSecondary">Ecotection</span>
              </div>
            </h1>
            <form onSubmit={handleMasuk} className="login-container mt-9 h-auto">
              <div className="input1 mb-6 flex flex-col">
                <label htmlFor="username" className="text-neutral-800 text-xl font-bold leading-normal">
                  Username:
                </label>
                <input required type="text" id="username" placeholder="Contoh: JohnDoe" className="border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input2 flex flex-col mb-6 relative">
                <label htmlFor="password" className="text-neutral-800 text-xl font-bold leading-normal">
                  Password:
                </label>
                <input
                  required
                  type={isClosed ? "password" : "text"}
                  id="password"
                  placeholder="your password!"
                  className="border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="eye-icon absolute top-4 right-0 h-full flex items-center pr-4" onClick={toggleEye}>
                  {isClosed ? <img src={mataTutup} alt="mataTutup" className="w-5 " /> : <img src={mataBuka} alt="mataTerbuka" className="w-5 " />}
                </div>
              </div>
              <button type="submit" className="button-login w-full py-3 mt-2 text-white bg-greenSecondary text-xl font-bold rounded-md border-none transition duration-200 cursor-pointer hover:brightness-90">
                Login
              </button>
              <p className="text-center mt-4 text-[#666] font-semibold">
                Belum punya akun?{" "}
                <Link to="/daftar" className=" text-greenSecondary  underline">
                  Daftar Sekarang
                </Link>
              </p>
              {error && <p className="wrong-input mt-4 text-center text-red-500">Wrong email or password!</p>}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Masuk;
