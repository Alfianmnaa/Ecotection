import React, { useContext, useEffect, useState } from "react";
import profImg from "../../assets/Navbar/kosong.jpeg";
import titikTiga from "../../assets/Laporan/titikTiga.svg";
import bookMarkIcon from "../../assets/Laporan/bookmark.svg";
import bookMarkFill from "../../assets/Laporan/bookmark_fill.svg";
import shareIcon from "../../assets/Laporan/share.svg";
import arrowUpIcon from "../../assets/Laporan/arrow_circle_up.svg";
import editIcon from "../../assets/DetilLaporan/edit.svg";
import trashIcon from "../../assets/DetilLaporan/trash.svg";
import Swal from "sweetalert2"; // Import SweetAlert2
import { axiosInstance } from "../../config";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const DetilKiri = () => {
  const { user, dataUserLogin } = useContext(UserContext);
  const [statusLaporan, setStatusLaporan] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [verifikasi, setVerifikasi] = useState(false);
  const [statusPertama, setStatusPertama] = useState("Diverifikasi");
  const [deskripsiPertama, setDeskripsiPertama] = useState(" ");
  const [waktuStatusPertama, setWaktuStatusPertama] = useState(" ");
  const [statusKedua, setStatusKedua] = useState(" ");
  const [deskripsiKedua, setDeskripsiKedua] = useState(" ");
  const [waktuStatusKedua, setWaktuStatusKedua] = useState(" ");
  const [statusKetiga, setStatusKetiga] = useState(" ");
  const [deskripsiKetiga, setDeskripsiKetiga] = useState(" ");
  const [waktuStatusKetiga, setWaktuStatusKetiga] = useState(" ");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);

  const path = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetchData();
  }, [path, user]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/aksi/laporan/" + path);
      const laporan = res.data;
      setData(laporan);
      // Periksa apakah user sudah melakukan upvote
      if (laporan.UpVote && user) {
        setIsUpvoted(laporan.UpVote.includes(user._id));
      }
      fetchUser(laporan.PemilikID);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(`/status/${path}`);
        setStatusLaporan(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatus();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Tampilkan konfirmasi SweetAlert2
      const confirmDelete = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (confirmDelete.isConfirmed) {
        await axiosInstance.delete(`/aksi/laporan/${id}`);
        await Swal.fire("Terhapus!", "Postingan telah dihapus.", "success").then(() => {
          navigate("/laporan");
        });
        // Refresh data setelah penghapusan berhasil
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axiosInstance.put(`/aksi/laporan/${id}`, {
        DeskripsiLaporan: data.DeskripsiLaporan,
      });
      await Swal.fire("Tersimpan!", "Deskripsi laporan telah diperbarui.", "success");
      // Refresh data setelah pengeditan berhasil
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  const handleUpvote = async () => {
    try {
      const res = await axiosInstance.put(`/aksi/laporan/upvote/${data._id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah upvote
      setData((prevData) => ({ ...prevData, UpVote: res.data.laporan.UpVote }));
      setIsUpvoted(true); // Set isUpvoted menjadi true setelah upvote berhasil
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await axiosInstance.put(`/aksi/laporan/downvote/${data._id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah downvote
      setData((prevData) => ({ ...prevData, UpVote: res.data.laporan.UpVote }));
      setIsUpvoted(false); // Set isUpvoted menjadi false setelah downvote berhasil
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {
    const baseUrl = window.location.href;
    const urlToShare = baseUrl;
    if (navigator.share) {
      navigator
        .share({
          url: urlToShare,
        })
        .then(() => console.log("Berhasil berbagi"))
        .catch((error) => console.error("Error berbagi:", error));
    } else {
      // Fallback jika fungsi share tidak didukung
      console.log("Fungsi share tidak didukung di browser ini.");
      // Implementasikan cara lain untuk berbagi link jika diperlukan
    }
  };
  const handleSimpan = async (id) => {
    try {
      await axiosInstance.put(`/aksi/laporan/simpan/${id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah upvote

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsave = async (id) => {
    try {
      await axiosInstance.put(`/aksi/laporan/unsave/${id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah upvote
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (id) => {
    try {
      const res = await axiosInstance.get("/user/" + id);
      // Menambahkan data user ke dalam state dataUser
      setDataUser((prevData) => [...prevData, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuatStatus = async () => {
    try {
      const statusBaru = {
        LaporanID: data?._id,
        PemProv: user?.username,
        StatusPertama: statusPertama,
        DeskripsiPertama: deskripsiPertama,
        WaktuStatusPertama: waktuStatusPertama,
        StatusKedua: statusKedua,
        DeskripsiKedua: deskripsiKedua,
        WaktuStatusKedua: waktuStatusKedua,
        StatusKetiga: statusKetiga,
        DeskripsiKetiga: deskripsiKetiga,
        WaktuStatusKetiga: waktuStatusKetiga,
      };
      await axiosInstance.post("/status/buat", statusBaru);
      await axiosInstance.put(`/aksi/laporan/${path}`, { StatusSekarang: "Diverifikasi" });
      Swal.fire("Terimakasih Penyelamat Bumi!", "Jaga Indonesia untuk Kita Bersama!", "success").then(() => {
        // Setelah SweetAlert ditampilkan, kosongkan data
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const updatedStatus = {
        StatusKedua: "Diproses",
        DeskripsiKedua: deskripsiKedua,
        WaktuStatusKedua: new Date().toISOString(),
      };

      // Make a PUT request to update the status
      await axiosInstance.put(`/status/update/${path}`, updatedStatus);
      await axiosInstance.put(`/aksi/laporan/${path}`, { StatusSekarang: "Diproses" });
      // Show success message to the user
      Swal.fire("Status Behasil diubah!", "Terimakasih telah menyelamatkan bumi!.", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      // Handle errors, show error messages, etc.
    }
  };

  const handleUpdateStatusNext = async () => {
    try {
      const updatedStatus = {
        StatusKetiga: "Selesai",
        DeskripsiKetiga: deskripsiKetiga,
        WaktuStatusKetiga: new Date().toISOString(),
      };

      // Make a PUT request to update the status
      await axiosInstance.put(`/status/update/${path}`, updatedStatus);
      await axiosInstance.put(`/aksi/laporan/${path}`, { StatusSekarang: "Selesai" });
      // Show success message to the user
      Swal.fire("Status Behasil diubah!", "Terimakasih telah menyelamatkan bumi!.", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      // Handle errors, show error messages, etc.
    }
  };

  const isSaved = user ? data.Disimpan?.includes(user._id) : false;
  const userData = dataUser.find((user) => user._id === data.PemilikID);

  return (
    <div>
      <div className="cardKu border-[1px] border-inputBorder 2xl:max-w-[690px] md:max-w-[520px] max-w-full  md:rounded-3xl rounded-2xl ">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={userData?.fotoPengguna || profImg} alt="profpic" className="2xl:w-14 2xl:h-14 md:w-12 md:h-12 w-10 h-10 rounded-full object-cover" />
              <p className="lg:text-[18px] text-[12px]">{data?.JenisLaporan == "Public" ? <b>{data?.Pemilik}</b> : <b>Anonymous</b>}</p>
            </div>
            {data?.StatusSekarang == "Diverifikasi" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#0084FF]  rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-smallText text-verySmallText text-[#0084FF] bg-[#E5F2FF] font-medium">Diverifikasi</span>
                <img src={titikTiga} alt="titikTiga" />
              </div>
            )}

            {data?.StatusSekarang == "Diproses" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#C9AE17]  rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-smallText text-verySmallText text-[#C9AE17] bg-[#FFF8D1] font-medium">Diproses</span>
                <img src={titikTiga} alt="titikTiga" />
              </div>
            )}
            {data?.StatusSekarang == "Selesai" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#53A88C]  rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-smallText text-verySmallText text-[#53A88C] bg-[#E2FFF5] font-medium">Selesai</span>
                <img src={titikTiga} alt="titikTiga" />
              </div>
            )}
          </div>
          <div className="my-4">
            <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Kategori :</span> {data.JenisKerusakan}
            </p>
            <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Lokasi :</span> {data.Kabupaten}, {data.Provinsi}
            </p>
            <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Detil Lokasi :</span> {data.AlamatDetail}
            </p>
            <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Waktu Lapor :</span> {new Date(data.createdAt).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {editingDescription ? (
            <div>
              <textarea
                className="focus:outline-none border-[1px] border-inputBorder p-2 rounded-lg w-full"
                autoFocus
                name="edit"
                id="edit"
                rows="10"
                value={data.DeskripsiLaporan}
                onChange={(e) => setData({ ...data, DeskripsiLaporan: e.target.value })}
              />
              <br />
              <button
                className="px-3 py-2 bg-greenMain text-white rounded-md mr-2"
                onClick={() => {
                  handleEdit(data._id);
                  setEditingDescription(false);
                }}
              >
                Submit
              </button>
              <button
                className="px-3 py-2 bg-yellowMain text-black rounded-md"
                onClick={() => {
                  setEditingDescription(false);
                }}
              >
                Batalkan
              </button>
              <br />
              <br />
            </div>
          ) : (
            <p className="lg:text-normal text-smallText text-[#222] font-medium my-3">{data.DeskripsiLaporan}</p>
          )}
          <img src={data.BuktiLaporan} alt="buktiFoto" className="2xl:min-w-[600px] md:min-w-[450px] min-w-[250px] md:rounded-2xl rounded-xl cursor-pointer" onClick={() => openModal(data.BuktiLaporan)} />
          <div className="flex items-center justify-between mt-4">
            <div>
              <div
                className={`flex gap-2 justify-center items-center px-2 py-2 border-[1px] border-[#D7D9DA] rounded-2xl font-semibold cursor-pointer ${isUpvoted ? "bg-[#E2FFF5]" : "bg-[#F1F1F1]"}`}
                onClick={isUpvoted ? handleDownvote : handleUpvote}
              >
                <img src={arrowUpIcon} alt="arrowUp" className="w-5" />

                <span className="text-[#636466] text-[12px]">Upvote · {data.UpVote ? data.UpVote.length : 0}</span>
              </div>
            </div>
            <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
              <img src={shareIcon} alt="shareicon" onClick={handleShare} />
              {isSaved ? <img src={bookMarkFill} alt="bookmarkfillicon" onClick={() => handleUnsave(data._id)} /> : <img src={bookMarkIcon} alt="bookmarkicon" onClick={() => handleSimpan(data._id)} />}
            </div>
          </div>
          {data?.PemilikID === user?._id && (
            <div className="flex gap-2 mt-6">
              <button className="flex item-center justify-center gap-1 border-[1px] border-black sm:py-3 sm:px-4 py-2 px-3 rounded-md " onClick={() => setEditingDescription(true)}>
                <img src={editIcon} alt="editIcon" className="w-6" />
                <span className="text-normal font-semibold">Ubah</span>
              </button>
              <button className="flex item-center justify-center gap-1 border-[1px] border-greenMain sm:py-3 sm:px-4 py-2 px-3 rounded-md " onClick={() => handleDelete(data._id)}>
                <img src={trashIcon} alt="editIcon" className="w-5" />
                <span className="text-normal font-semibold">Hapus</span>
              </button>
            </div>
          )}

          {verifikasi ? (
            <>
              {statusLaporan === null ? (
                <textarea
                  className="w-full focus:outline-none border-[1px] border-inputBorder p-2 my-4"
                  name="verifikasi"
                  id="verifikasi"
                  cols="30"
                  rows="5"
                  placeholder="laporan diteruskan ke pemerintah kabupaten ABC"
                  onChange={(e) => setDeskripsiPertama(e.target.value)}
                ></textarea>
              ) : (
                <>
                  {statusLaporan?.StatusPertama !== " " && statusLaporan?.StatusKedua == " " && (
                    <textarea
                      className="w-full focus:outline-none border-[1px] border-inputBorder p-2 my-4"
                      name="proses"
                      id="proses"
                      cols="30"
                      rows="5"
                      placeholder="laporan diproses oleh pemerintah dan dilanjutkan ke pemerintah kabupaten ABC"
                      onChange={(e) => setDeskripsiKedua(e.target.value)}
                    ></textarea>
                  )}
                  {statusLaporan?.StatusKedua !== " " && statusLaporan?.StatusKetiga == " " && (
                    <textarea
                      className="w-full focus:outline-none border-[1px] border-inputBorder p-2 my-4"
                      name="selesai"
                      id="selesai"
                      cols="30"
                      rows="5"
                      placeholder="laporan berhasil diselesaikan oleh ABC"
                      onChange={(e) => setDeskripsiKetiga(e.target.value)}
                    ></textarea>
                  )}
                </>
              )}

              {statusLaporan === null ? (
                <button onClick={handleBuatStatus} className="text-white bg-greenMain px-3 py-2 rounded-md mr-2">
                  Submit Verifikasi
                </button>
              ) : (
                <>
                  {statusLaporan?.StatusPertama !== " " && statusLaporan?.StatusKedua == " " && (
                    <button onClick={handleUpdateStatus} className="text-white bg-greenMain px-3 py-2 rounded-md mr-2">
                      Submit Proses
                    </button>
                  )}
                  {statusLaporan?.StatusKedua !== " " && statusLaporan?.StatusKetiga == " " && (
                    <button onClick={handleUpdateStatusNext} className="text-white bg-greenMain px-3 py-2 rounded-md mr-2">
                      Selesaikan
                    </button>
                  )}
                </>
              )}
              <button onClick={() => setVerifikasi(false)} className="text-white bg-red-700 px-3 py-2 rounded-md">
                Batalkan
              </button>
            </>
          ) : (
            <>
              {data?.Provinsi == user?.username && statusLaporan === null ? (
                <button className="mt-4 px-3 py-2 rounded-md text-white bg-[#0084FF]" onClick={() => setVerifikasi(true)}>
                  Verifikasi Laporan
                </button>
              ) : (
                <>
                  {statusLaporan?.StatusPertama !== " " && statusLaporan?.StatusKedua == " " && (
                    <button className="mt-4 px-3 py-2 rounded-md text-white bg-[#C9AE17] mr-2" onClick={() => setVerifikasi(true)}>
                      Proses Laporan
                    </button>
                  )}
                  {statusLaporan?.StatusKedua !== " " && statusLaporan?.StatusKetiga == " " && (
                    <button className="mt-4 px-3 py-2 rounded-md text-white bg-[#53A88C]" onClick={() => setVerifikasi(true)}>
                      Selesaikan Laporan
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="max-w-screen-lg w-full mx-4">
            <div className="relative">
              <span className="absolute top-2 right-2 text-white cursor-pointer md:text-5xl text-3xl" onClick={closeModal}>
                &times;
              </span>
              <img src={modalImage} alt="modalImage" className="rounded-lg w-full max-h-[500px] object-cover" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetilKiri;
