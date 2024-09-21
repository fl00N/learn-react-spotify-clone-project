import { useContext, useEffect, useState } from "react";
import PrivatePlaylistDropdownItem from './Playlist/PrivatePlaylistDropdownItem'
import { assets } from "../assets/assets";
import { AuthContext } from "../contexts/AuthContext";
import { PlaylistContext } from "../contexts/PlaylistContext";

const LikeDropdown = ({ onClose, onDone, setSelectedPlaylists, selectedSongId  }) => {

  const [selectedPlaylistsInternal, setSelectedPlaylistsInternal] = useState([]);

  const { playlistsData, addPlaylist } = useContext(PlaylistContext);
  const { authState } = useContext(AuthContext);

  const handleCreatePlaylistClick = async () => {
    try {
        await addPlaylist(authState.userId);
    } catch (error) {
        console.error('Error adding playlist:', error);
    }
  };

  const handleToggleSelect = (playlistId) => {
    setSelectedPlaylistsInternal(prevSelectedPlaylists => {
        const updatedPlaylists = prevSelectedPlaylists.includes(playlistId)
            ? prevSelectedPlaylists.filter(id => id !== playlistId)
            : [...prevSelectedPlaylists, playlistId];
        
        return updatedPlaylists;
    });
};

  const isSelected = selectedPlaylistsInternal.length > 0;

  const handleDoneClick = async () => {
    const currentSelectedPlaylists = [...selectedPlaylistsInternal];
  
    setSelectedPlaylists(currentSelectedPlaylists);
    await onDone(selectedSongId);
    onClose();
  };

  useEffect(() => {
    setSelectedPlaylists(selectedPlaylistsInternal);
  }, [selectedPlaylistsInternal, setSelectedPlaylists]);

  return (
    <div className="bg-[#1f1f1f] text-white rounded shadow-lg p-4 absolute bottom-[150px] right-[100px] z-50">
      <p className="font-[Metropolis] text-xs text-gray-400 font-bold mb-3">Add to playlist</p>
      <div onClick={handleCreatePlaylistClick} className="flex items-center gap-2.5 mb-2.5 cursor-pointer">
        <img className="w-4" src={assets.plus_icon} alt="" />
        <p className="font-[Metropolis] font-medium">New playlist</p>
      </div>
      <hr className="brightness-[.35] mb-1"/>
      <div className="h-[100px] overflow-auto">
        {playlistsData.map((item) => (
            <PrivatePlaylistDropdownItem
                key={item._id}
                name={item.name}
                id={item._id}
                image={item.image}
                isSelected={selectedPlaylistsInternal.includes(item._id)}
                onToggleSelect={handleToggleSelect}
            />
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <button 
          onClick={onClose} 
          className="font-[Metropolis] text-sm font-semibold text-gray-400 cursor-pointer hover:text-white hover:scale-105 active:text-gray-500 active:scale-100"
        >
          Cancel
        </button>

        {isSelected && (
          <button 
            onClick={handleDoneClick}
            className="font-[Metropolis] font-bold bg-white text-black text-sm ml-3 px-3 py-1.5 rounded-full hidden md:block cursor-pointer hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}

export default LikeDropdown;
