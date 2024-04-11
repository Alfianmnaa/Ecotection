import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar2 } from "../components/Navbar/Navbar2";
import { axiosInstance } from "../config";

const Daftar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fotoPengguna, setFotoPengguna] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [jumlahLaporan, setJumlahLaporan] = useState(0);
  const [error, setError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = { username, email, password, isAdmin, fotoPengguna, jumlahLaporan };
    try {
      await axiosInstance.post("/auth/register", newUser);
      window.location.replace("/masuk");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar2 />
      <main>
        <div className="container-register md:py-[120px] py-[100px] min-h-screen ">
          <div className="sm:w-[550px] w-[300px] mx-auto">
            <h1 className=" text-[32px] font-bold">
              Selamat Datang di <span className="text-greenSecondary">Ecotection</span> 👋
            </h1>
            <p className="login-text mt-3 text-[#666] font-medium text-[16px] ">Mari mulai buat akun anda</p>
            <form onSubmit={handleRegister} className="login-container mt-9 h-auto ">
              <div className="input2 flex flex-col mb-6">
                <label htmlFor="username" className="text-neutral-800 text-xl font-bold leading-normal">
                  Nama Lengkap
                </label>
                <input id="username" type="text" required placeholder="Contoh: John Doe " className="border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input2 flex flex-col mb-6">
                <label htmlFor="email" className="text-neutral-800 text-xl font-bold  leading-normal">
                  Email
                </label>
                <input id="email" type="email" required placeholder="Contoh: JohnDoe@gmail.com " className="border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input2 flex flex-col mb-6">
                <label htmlFor="password" className="text-neutral-800 text-xl font-bold  leading-normal">
                  Password
                </label>
                <input id="password" type="password" required placeholder="Contoh: John123Doe " className="border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none" onChange={(e) => setPassword(e.target.value)} />
                <div className=" text-zinc-700 text-smtprimary font-normal  leading-none mt-2">Gunakan minimal 8 karakter dengan kombinasi huruf dan angka</div>
              </div>
              <button type="submit" className="button-login w-full py-3 mt-2 text-white bg-greenSecondary text-xl font-bold rounded-md border-none transition duration-200 cursor-pointer hover:brightness-90">
                Daftar
              </button>
              <div className="text-center mt-4">
                <span className="text-stone-500 text-base font-medium  leading-normal">Sudah punya akun? </span>
                <Link to={"/masuk"} className="text-greenSecondary text-base font-bold  underline leading-normal">
                  Masuk sekarang
                </Link>
              </div>
              {error && <p className="wrong-input mt-4 text-center text-red-500">Wrong email or password!</p>}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Daftar;
