import { useState } from "react";
import { assets } from "../../../assets/assets";

const PlaylistImage = ({ playlistData, openEditModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {playlistData.image ? (
        <div
          onClick={() => openEditModal(playlistData)}
          className="w-36 h-36 flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <div className="flex items-center justify-center relative">
              <img
                onClick={() => openEditModal(playlistData)}
                className="w-36 h-36 rounded object-cover brightness-[.30]"
                src={playlistData.image}
                alt={playlistData.name}
              />
              <img
                className="w-12 rounded absolute"
                src={assets.pencil_icon}
                alt="Edit"
              />
              <p className="absolute bottom-6 text-sm font-semibold">
                Choose a photo
              </p>
            </div>
          ) : (
            <img
              onClick={() => openEditModal(playlistData)}
              className="w-36 h-36 rounded object-cover"
              src={playlistData.image}
              alt={playlistData.name}
            />
          )}
        </div>
      ) : (
        <div
          onClick={() => openEditModal(playlistData)}
          className="w-36 h-36 flex items-center justify-center bg-[#282828]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-36 h-36 flex items-center justify-center relative">
            <img
              className="w-12 rounded"
              src={isHovered ? assets.pencil_icon : assets.music_note_icon}
              alt="Edit"
            />
            {isHovered && (
              <p className="absolute bottom-6 text-sm font-semibold">
                Choose a photo
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistImage;
