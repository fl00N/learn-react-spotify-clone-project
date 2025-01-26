import { useContext, useState } from "react";
import PrivatePlaylistItem from "../../Desktop/Playlist/PrivatePlaylistItem";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import { assets } from "../../../assets/assets";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const LibraryMobile = () => {
  const { authState } = useContext(AuthContext);
  const { playlistsData, addPlaylist } = useContext(PlaylistContext);
  const [isOpen, setOpen] = useState(false);

  const handleCreatePlaylistClick = async () => {
    try {
      await addPlaylist(authState.userId);
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-white text-3xl font-bold">My Library</h1>
        <img
          className="w-5"
          src={assets.plus_icon}
          alt="Toggle dropdown"
          onClick={toggleDropdown}
        />

        {isOpen && (
          <div className="absolute right-4 top-14 w-[12.5rem] bg-[#282828] rounded shadow-lg z-50">
            <ul className="py-1.5 px-1">
              <li
                className="flex items-center py-2 px-2 hover:bg-[#ffffff23] cursor-pointer"
                onClick={
                  authState.token
                    ? () => handleCreatePlaylistClick()
                    : () => {
                        toast.error("You are not signed in!");
                        setOpen(false);
                      }
                }
              >
                <img
                  className="w-6"
                  src={assets.note_icon}
                  alt="Create Playlist Icon"
                />
                <p className="font-medium text-sm text-[#ffffffE6] px-2">
                  Create a new playlist
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-4">
        {playlistsData.map((item) => (
          <PrivatePlaylistItem
            key={item._id}
            name={item.name}
            id={item._id}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryMobile;
