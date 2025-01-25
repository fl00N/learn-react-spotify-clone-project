/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { assets } from "../../../assets/assets";
import { AuthContext } from "../../../contexts/AuthContext";
import ModalMessage from "../Message/ModalMessage";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  const { songsData, playWithId, setNavigationToAlbum } =
    useContext(PlayerContext);
  const { authState } = useContext(AuthContext);

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClick = () => {
    setModalOpen(true);
  };

  const handlePlayFirstSong = () => {
    setNavigationToAlbum();

    const albumSongs = songsData.filter((song) => song.album === name);

    if (albumSongs.length > 0) {
      playWithId(albumSongs[0]._id);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative md:min-w-[180px] md:p-2 md:px-3 md:rounded md:cursor-pointer md:hover:bg-[#ffffff26] max-md:bg-[#1f1f1f] max-md:flex max-md:items-center max-md:min-w-[100px]"
      onClick={() => navigate(`/album/${id}`)}
    >
      <img className="rounded max-md:h-[40px]" src={image} alt={name} />
      <p className="font-bold md:mt-2 md:mb-1 max-lg:text-white max-md:text-[10px] max-md:text-center max-md:ml-2 max-md:font-semibold">
        {name}
      </p>
      <p className="text-slate-200 text-sm max-md:hidden">{desc}</p>

      <button
        onClick={
          !authState.token
            ? (e) => {
                e.stopPropagation();
                handleModalClick();
              }
            : (e) => {
                e.stopPropagation();
                handlePlayFirstSong();
              }
        }
        className={`max-md:hidden absolute bottom-[5.65rem] right-4 transition transform duration-[350ms] ${
          isHovered
            ? "translate-y-[0rem] opacity-100"
            : "translate-y-[0.5rem] opacity-0"
        }`}
      >
        <img
          src={assets.green_play_icon}
          alt="Play"
          className="w-12 hover:scale-105 active:scale-100"
        />
      </button>

      {isModalOpen && (
        <ModalMessage image={image} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default AlbumItem;
