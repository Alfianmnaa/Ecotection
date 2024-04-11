import React, { useContext, useState, useEffect } from "react";
import editIcon from "../../assets/Pengaturan/edit.svg";
import kosong from "../../assets/Pengaturan/kosong.jpeg";
import { UserContext } from "../../context/UserContext";
import upload from "../../utils/upload";
import { axiosInstance } from "../../config";
import Swal from "sweetalert2";

const MainEdit = () => {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [file, setFile] = useState(null);

  // Mengatur nilai awal dari state dengan data user
  useEffect(() => {
    fetchUser();
    setNamaLengkap(user?.namaLengkap);
    setUsername(user?.username);
    setEmail(user?.email);
    setJenisKelamin(user?.jenisKelamin);
    setTanggalLahir(user?.tanggalLahir);
  }, [user]);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/user/${user?._id}`);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfil = async (id) => {
    try {
      const url = await upload(file);
      const updateProfil = {
        namaLengkap,
        username,
        email,
        fotoPengguna: url,
        tanggalLahir,
        jenisKelamin,
      };
      await axiosInstance.put(`/user/${id}`, updateProfil);
      // Update user context setelah berhasil
      setUser((prevUser) => ({ ...prevUser, ...updateProfil }));
      await Swal.fire("Tersimpan!", "Informasi Berhasil Diperbarui", "success");
      // Refresh data setelah pengeditan berhasil
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "jenisKelamin") {
      setJenisKelamin(value);
    }
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleBatal = () => {
    window.location.reload();
  };
  return (
    <section className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4 pb-20">
      <h4 className="lg:text-[24px] sm:text-body text-normal font-bold">Biodata</h4>
      <br />
      <form className="border-[1px] border-inputBorder py-6 px-4">
        <div className="lg:text-normal text-smallText font-medium mt-4 max-w-[560px] flex justify-between">
          <label htmlFor="namaLengkap">Nama Lengkap</label>
          <input type="text" id="namaLengkap" className="border-[1px] border-inputBorder px-2 py-1 ml-2 focus:outline-none md:w-[320px] w-[200px]" defaultValue={userData.namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} />
        </div>
        <div className="lg:text-normal text-smallText font-medium mt-4 max-w-[560px] flex justify-between">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="border-[1px] border-inputBorder px-2 py-1 ml-2 focus:outline-none md:w-[320px] w-[200px]" defaultValue={userData.username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="lg:text-normal text-smallText font-medium mt-4 max-w-[560px] flex justify-between">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="border-[1px] border-inputBorder px-2 py-1 ml-2 focus:outline-none md:w-[320px] w-[200px]" defaultValue={userData.email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="lg:text-normal text-smallText font-medium mt-4 max-w-[660px] flex justify-between items-center gap-8">
          <p>Foto Profil</p>
          <div className="flex flex-wrap items-center gap-4">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="BuktiFoto" className="max-w-32 rounded-lg object-cover" />
            ) : (
              <img src={userData?.fotoPengguna ? userData?.fotoPengguna : kosong} alt="foto-profil" className="max-w-32 rounded-lg object-cover" />
            )}
            <input type="file" id="profPic" className="hidden" onChange={handleFileInputChange} />
            <label htmlFor="profPic" className="cursor-pointer">
              <div className="flex gap-4 justify-center items-center border-[1px] border-inputBorder py-2 rounded-md max-w-48 mb-2">
                <span>Ubah Foto Profil</span>
                <label htmlFor="editProfil">
                  <img src={editIcon} alt="editIcon" />
                </label>
                <input type="file" className="hidden" />
              </div>
              <p className="text-verySmallText text-[#8A8A8A]">Ukuran file maksimal 1 MB</p>
              <p className="text-verySmallText text-[#8A8A8A]">Ekstensi yang diperbolehkan: .jpg .jpeg .png</p>
            </label>
          </div>
        </div>
        <div className="lg:text-normal text-smallText font-medium mt-4 max-w-[560px] flex justify-between">
          <label htmlFor="tanggalLahir">Tanggal Lahir</label>
          <input id="tanggalLahir" type="date" className="border-[1px] border-inputBorder px-2 py-1 ml-2 focus:outline-none md:w-[320px] w-[200px]" defaultValue={userData?.tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} />
        </div>
        <div className="lg:text-normal text-smallText font-medium mt-4 max-w-[560px] flex justify-between">
          <p>Jenis Kelamin</p>
          <div>
            <input type="radio" id="laki-laki" name="jenisKelamin" defaultValue="Laki Laki" checked={jenisKelamin === "Laki Laki"} onChange={handleInputChange} />
            <label htmlFor="laki-laki" className="mr-4 ml-2">
              Laki Laki
            </label>

            <input type="radio" id="perempuan" name="jenisKelamin" defaultValue="Perempuan" checked={jenisKelamin === "Perempuan"} onChange={handleInputChange} />
            <label htmlFor="perempuan" className="mr-4 ml-2">
              Perempuan
            </label>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-end gap-2 mt-4">
        <button className="px-4 py-3 rounded-md border-2 border-[#6B7280] text-[#6B7280] md:text-smallText font-bold text-verySmallText" onClick={handleBatal}>
          Batal
        </button>
        <button className="px-4 py-3 rounded-md bg-greenSecondary border-2 border-greenSecondary text-white md:text-smallText font-bold text-verySmallText" onClick={() => handleEditProfil(user._id)}>
          Simpan Perubahan
        </button>
      </div>
    </section>
  );
};

export default MainEdit;
