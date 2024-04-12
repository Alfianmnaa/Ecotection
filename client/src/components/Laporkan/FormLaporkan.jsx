import React, { useContext, useEffect, useState } from "react";
import addPhoto from "../../assets/Laporkan/addPhoto.svg";
import SelectFormLaporkan from "./SelectFormLaporkan";
import send from "../../assets/Laporkan/send.svg";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import Swal from "sweetalert2";
import upload from "../../utils/upload";

const FormLaporkan = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState({});
  const [deskripsi, setDeskripsi] = useState("");
  const [alamatDetail, setAlamatDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState([]);

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
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectData = (data) => {
    setSelectedData(data);
  };

  const handleSubmitLaporan = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!user) {
      navigate("/masuk");
    } else if (dataUser.isAdmin == true) {
      Swal.fire("Peringatan!", "Maaf admin & pemerintah tidak bisa melapor!", "warning");
      return;
    } else if (!user || !file || !deskripsi || !alamatDetail || Object.keys(selectedData).length === 0) {
      // If any field is empty, show alert
      Swal.fire("Peringatan!", "Harap lengkapi semua informasi sebelum mengirim laporan", "warning");
      return;
    }
    try {
      setLoading(true);
      const url = await upload(file);
      const newLaporan = {
        Pemilik: user.username,
        PemilikID: user._id,
        BuktiLaporan: url,
        ...selectedData,
        DeskripsiLaporan: deskripsi,
        AlamatDetail: alamatDetail,
      };
      await axiosInstance.post("/aksi/laporkan", newLaporan);
      await axiosInstance.put(`/user/update/${user?._id}`, {
        jumlahLaporan: dataUser.jumlahLaporan + 1,
      });
      setLoading(false);
      Swal.fire("Terimakasih Sahabat Bumi!", "Laporan anda sangat bermanfaat untuk Indonesia", "success").then(() => {
        // Setelah SweetAlert ditampilkan, kosongkan data
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="sm:p-10 p-4">
        <div className="bg-white 2xl:max-w-[940px] lg:max-w-[800px] md:max-w-[680px] max-w-[640px] h-auto md:shadow-lg shadow-md md:rounded-3xl rounded-xl mx-auto 2xl:translate-y-[-620px] translate-y-[-320px]">
          <form onSubmit={handleSubmitLaporan} className="sm:p-20 p-8">
            <h3 className="md:text-[32px] sm:text-subheadline text-body md:leading-normal leading-normal  text-center font-bold py-6 mb-10">Tuliskan laporan secara jelas dan detail</h3>
            {file ? (
              <>
                <p className="md:text-body text-normal font-semibold my-3">Bukti Kejadian</p>
                <img src={URL.createObjectURL(file)} alt="BuktiFoto" className="w-full max-h-[200px] object-cover" />
              </>
            ) : (
              <label htmlFor="imageLaporkan">
                <p className="md:text-body text-normal font-semibold my-3">Bukti Kejadian</p>
                <div className="border-dashed border-2 border-inputBorder rounded-lg cursor-pointer max-h-[200px]" onDrop={handleFileDrop} onDragOver={handleDragOver}>
                  <div className="p-10 flex flex-col justify-center items-center">
                    <img src={addPhoto} alt="iconAddImg" className="md:w-8 w-6 mb-2" />
                    <p className="md:text-normal text-smallText text-center">Drag and drop foto atau klik untuk upload</p>
                    <p className="md:text-normal text-smallText  text-center text-[#6B7280]">JPEG, JPG, PNGF (5MB maximum)</p>
                  </div>
                  <input type="file" id="imageLaporkan" className="hidden" onChange={handleFileInputChange} />
                </div>
              </label>
            )}
            <div className="mt-4">
              <label htmlFor="deskripsiLaporan">
                <p className="md:text-body text-normal font-semibold py-3">Deskripsi</p>
              </label>
              <textarea
                cols="30"
                rows="10"
                type="text"
                id="deskripsiLaporan"
                className="w-full h-32 p-4 block outline-none rounded-lg border-2 border-inputBorder font-medium"
                placeholder="Jelaskan secara detail kejadian yang ingin Anda laporkan"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <SelectFormLaporkan onSelectData={handleSelectData} />
            <div className="mt-4">
              <label htmlFor="alamat Detail">
                <p className="md:text-body text-normal font-semibold py-3">Alamat Detail</p>
              </label>
              <input
                type="text"
                id="alamat Detail"
                className="w-full p-4 block outline-none rounded-lg border-2 border-inputBorder font-medium"
                placeholder="Contoh : Jl Mangga 1, didepan mall A"
                onChange={(e) => setAlamatDetail(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-8">
              <button type="submit" className="flex gap-2 justify-center items-center py-3 px-5 bg-greenMain text-white rounded-[40px] text-normal font-semibold hover:brightness-150 duration-100">
                <span>{loading ? "Mengirim" : "Kirim Laporan"}</span>
                <img src={send} alt="send" className="w-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default FormLaporkan;
