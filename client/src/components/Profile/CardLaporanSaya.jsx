import React, { useContext, useEffect, useState } from "react";
import bookMarkIcon from "../../assets/Pengaturan/bookmark.svg";
import bookMarkFill from "../../assets/Laporan/bookmark_fill.svg";
import shareIcon from "../../assets/Pengaturan/share.svg";
import arrowUpIcon from "../../assets/Pengaturan/arrow_circle_up.svg";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { UserContext } from "../../context/UserContext";

const CardLaporanSaya = ({ itemData, fetchAgain }) => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  // const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    fetchAgain();
  }, [user]);

  const handleUpvote = async () => {
    try {
      const res = await axiosInstance.put(`/aksi/laporan/upvote/${itemData._id}`, {
        userId: user._id,
      });
      // Perbarui data laporan setelah upvote
      setData((prevData) => ({ ...prevData, UpVote: res.data.UpVote }));
      fetchAgain();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await axiosInstance.put(`/aksi/laporan/downvote/${itemData._id}`, {
        userId: user._id,
      });

      // Perbarui data laporan setelah downvote
      setData((prevData) => ({ ...prevData, UpVote: res.data.UpVote }));
      fetchAgain();
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

      fetchAgain();
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
      fetchAgain();
    } catch (error) {
      console.log(error);
    }
  };
  const isSaved = user ? itemData.Disimpan.includes(user._id) : false;
  // const isUpvoted = user ? itemData.Disimpan.includes(user._id) : false;
  const isUpvoted = user ? itemData.UpVote.includes(user._id) : false;
  return (
    <div className="cardKu border-[1px] border-inputBorder 2xl:max-w-[400px] max-w-[340px] rounded-2xl ">
      <div className="p-4">
        <Link to={`/laporan/${itemData._id}`}>
          <div className="flex items-center">
            <div>
              <div>
                <p className="text-[#8A8A8A] font-medium md:text-smallText text-verySmallText ">{new Date(itemData.createdAt).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                <p className="lg:text-smallText text-[12px] text-[#5B5B5B] font-medium">
                  {itemData.Kabupaten}, {itemData.Provinsi} · {itemData.JenisKerusakan}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="border-[1px] border-[#53A88C]  rounded-[40px] py-2 px-4 text-smallText text-[#53A88C] bg-[#E2FFF5] font-medium">Selesai</span>
            </div>
          </div>

          <p className="lg:text-smallText text-[12px] text-[#222] font-medium overflow-hidden 2xl:line-clamp-4 md:line-clamp-3 line-clamp-2 my-2">{itemData.DeskripsiLaporan}</p>
          <img src={itemData.BuktiLaporan} alt="buktiFoto" className="2xl:h-[260px] h-[180px] w-full object-cover rounded-2xl" />
        </Link>
        <div className="flex items-center justify-between mt-4">
          <div
            className={`flex gap-2 justify-center items-center px-2 py-2 border-[1px] border-[#D7D9DA] rounded-2xl font-semibold cursor-pointer ${isUpvoted ? "bg-[#E2FFF5]" : "bg-[#F1F1F1]"}`}
            onClick={() => (isUpvoted ? handleDownvote(itemData._id) : handleUpvote(itemData._id))}
          >
            <img src={arrowUpIcon} alt="arrowUp" className="w-5" />
            <span className="text-[#636466] text-[12px]">Upvote · {itemData.UpVote.length}</span>
          </div>
          <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
            <img src={shareIcon} alt="shareicon" onClick={() => handleShare(itemData._id)} />
            {isSaved ? <img src={bookMarkFill} alt="bookmarkfillicon" onClick={() => handleUnsave(itemData._id)} /> : <img src={bookMarkIcon} alt="bookmarkicon" onClick={() => handleSimpan(itemData._id)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLaporanSaya;
