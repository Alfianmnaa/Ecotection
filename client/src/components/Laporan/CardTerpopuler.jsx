import React, { useContext, useEffect, useState } from "react";
import profImg from "../../assets/Navbar/kosong.jpeg";
import titikTiga from "../../assets/Laporan/titikTiga.svg";
import { axiosInstance } from "../../config";
import bookMarkIcon from "../../assets/Laporan/bookmark.svg";
import bookMarkFill from "../../assets/Laporan/bookmark_fill.svg";
import shareIcon from "../../assets/Laporan/share.svg";
import arrowUpIcon from "../../assets/Laporan/arrow_circle_up.svg";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const CardTerpopuler = () => {
  const { user } = useContext(UserContext);
  const [semuaData, setSemuaData] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    fetchLaporan();
  }, []); // Menambahkan kategori sebagai dependency

  const fetchLaporan = async () => {
    try {
      const res = await axiosInstance.get("/aksi/laporan/kategori");
      // Mengurutkan data berdasarkan jumlah UpVote dari yang tertinggi ke terendah
      const sortedData = res.data.sort((a, b) => b.UpVote.length - a.UpVote.length);
      // Mengambil 9 laporan pertama dari data yang telah diurutkan
      const slicedData = sortedData.slice(0, 9);
      setSemuaData(slicedData);
      // Mengambil data user untuk setiap laporan
      slicedData.forEach((laporan) => {
        fetchUser(laporan.PemilikID);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = (id) => {
    const baseUrl = window.location.href;
    const urlToShare = `${baseUrl}/${id}`;
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

  const handleUpvote = async (id) => {
    try {
      const res = await axiosInstance.put(`/aksi/laporan/upvote/${id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah upvote
      setSemuaData((prevData) => prevData.map((laporan) => (laporan._id === id ? { ...laporan, UpVote: res.data.laporan.UpVote } : laporan)));
      fetchLaporan();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSimpan = async (id) => {
    try {
      await axiosInstance.put(`/aksi/laporan/simpan/${id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah upvote

      fetchLaporan();
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
      fetchLaporan();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async (id) => {
    try {
      const res = await axiosInstance.put(`/aksi/laporan/downvote/${id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah downvote
      setSemuaData((prevData) => prevData.map((laporan) => (laporan._id === id ? { ...laporan, UpVote: res.data.laporan.UpVote } : laporan)));
      fetchLaporan();
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

  return (
    <section>
      <div className="cardContainer flex flex-wrap justify-center gap-8 mt-6">
        {semuaData.length > 0 ? (
          semuaData.map((laporan, index) => {
            const isUpvoted = user ? laporan.UpVote.includes(user._id) : false;
            const isSaved = user ? laporan.Disimpan?.includes(user._id) : false;
            const userData = dataUser.find((user) => user._id === laporan.PemilikID);

            return (
              <div className="cardKu border-[1px] border-inputBorder 2xl:max-w-[380px] max-w-[300px] rounded-2xl" key={index}>
                <div className="p-4">
                  <div className="flex items-center gap-2 h-[80px]">
                    <img src={userData?.fotoPengguna || profImg} alt="profpic" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="lg:text-smallText text-[12px]">
                        {laporan.JenisLaporan == "Public" ? <b>{laporan.Pemilik}</b> : <b>Anonymous</b>}
                        <span className="text-[#8A8A8A]"> · {new Date(laporan.createdAt).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                      </p>
                      <p className="lg:text-smallText text-[12px] text-[#5B5B5B] font-medium">
                        {laporan.Kabupaten}, {laporan.Provinsi} · {laporan.JenisKerusakan}
                      </p>
                    </div>
                    <img src={titikTiga} alt="titikTiga" />
                  </div>
                  <Link to={`/laporan/${laporan._id}`}>
                    <p className="lg:text-smallText text-[12px] text-[#222] font-medium overflow-hidden 2xl:line-clamp-4 md:line-clamp-3 line-clamp-2 my-2">{laporan.DeskripsiLaporan}</p>
                    <img src={laporan.BuktiLaporan} alt="buktiFoto" className="2xl:h-[260px] h-[180px] w-full object-cover rounded-2xl" />
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <div
                      className={`flex gap-2 justify-center items-center px-2 py-2 border-[1px] border-[#D7D9DA] rounded-2xl font-semibold cursor-pointer ${isUpvoted ? "bg-[#E2FFF5]" : "bg-[#F1F1F1]"}`}
                      onClick={() => (isUpvoted ? handleDownvote(laporan._id) : handleUpvote(laporan._id))}
                    >
                      <img src={arrowUpIcon} alt="arrowUp" className="w-5" />
                      <span className="text-[#636466] text-[12px]">Upvote · {laporan.UpVote.length}</span>
                    </div>
                    <div className="cursor-pointer flex gap-4 items-center text-body ">
                      <img src={shareIcon} alt="shareicon" onClick={() => handleShare(laporan._id)} className="text-[#5B5B5B]" />
                      {isSaved ? <img src={bookMarkFill} alt="bookmarkfillicon" onClick={() => handleUnsave(laporan._id)} /> : <img src={bookMarkIcon} alt="bookmarkicon" onClick={() => handleSimpan(laporan._id)} />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">Tidak ada laporan dengan kategori ini.</p>
        )}
      </div>
    </section>
  );
};

export default CardTerpopuler;
