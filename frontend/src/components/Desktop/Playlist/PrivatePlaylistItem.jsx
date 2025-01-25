/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { assets } from "../../../assets/assets";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import { useContextMenu } from "../../../contexts/MenuContext";

const PrivatePlaylistItem = ({ image, name, id }) => {
  const navigate = useNavigate();
  const { setNavigationToPlaylist, currentId } = useContext(PlayerContext);
  const { playlistsData } = useContext(PlaylistContext);
  const { showMenu } = useContextMenu();

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/playlist/${id}`);
    setNavigationToPlaylist();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    if (playlistsData) {
      const playlist = playlistsData.find((pl) => pl._id === id);
      if (playlist) {
        showMenu(e.clientX, e.clientY, playlist);
      } else {
        console.error("Playlist not found");
      }
    } else {
      console.error("playlistData is undefined");
    }
  };

  const isActive = currentId === id;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative md:min-w-[50px] md:p-2 md:mr-2 md:ml-2 flex items-center rounded md:cursor-pointer max-md:bg-[#1f1f1f] max-md:min-w-[100px]
                ${isActive ? "bg-[#ffffff26]" : ""} 
                ${isHovered && !isActive ? "hover:bg-[#282828]" : ""}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {image ? (
        <img
          className="w-12 h-12 max-lg:h-11 max-lg:w-11 rounded object-cover max-md:w-[40px] max-md:h-[40px]"
          src={image}
          alt={name}
        />
      ) : (
        <div className="rounded w-12 h-12 max-lg:h-11 max-lg:w-11 flex items-center justify-center bg-[#282828] max-md:w-[40px] max-md:h-[40px]">
          <img
            className="w-6 max-lg:w-5 brightness-65"
            src={assets.music_note_icon}
            alt=""
          />
        </div>
      )}

      <div className="ml-3 max-md:ml-2 max-lg:hidden max-md:block">
        <p className="font-semibold max-md:block max-md:text-white max-md:text-[10px]">
          {name}
        </p>
        <p className="text-[#b3b3b3] text-sm max-md:hidden">Playlist</p>
      </div>
    </div>
  );
};

export default PrivatePlaylistItem;
