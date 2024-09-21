/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { PlayerContext } from "../../contexts/PlayerContext";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import { useContextMenu } from "../../contexts/MenuContext";

const PrivatePlaylistItem = ({ image, name, id }) => {
    const navigate = useNavigate();
    const { playWithId, setNavigationToPlaylist } = useContext(PlayerContext);
    const { playlistsData } = useContext(PlaylistContext)
    const { showMenu } = useContextMenu();

    const [isHovered, setIsHovered] = useState(false);

    const handlePlayFirstSong = () => {
      setNavigationToPlaylist();

      const playlistSongs = playlistsData.songs;        
      if (playlistSongs.length > 0) {
          playWithId(playlistSongs[0]._id);
      }
    };

    const handleClick = () => {
        navigate(`/playlist/${id}`)
        setNavigationToPlaylist()
    }

    const handleContextMenu = (e) => {
        e.preventDefault();

        if (playlistsData) {
            const playlist = playlistsData.find(pl => pl._id === id);
            if (playlist) {
                showMenu(e.clientX, e.clientY, playlist);
            } else {
                console.error('Playlist not found');
            }
        } else {
            console.error('playlistData is undefined');
        }
    };

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative min-w-[50px] p-2 mr-2 ml-2 flex items-center rounded cursor-pointer hover:bg-[#ffffff26]"
            onClick={handleClick}
            onContextMenu={handleContextMenu}
        >
            {image 
              ? <img className="w-12 h-12 rounded object-cover" src={image} alt={name} />
              : <div className="rounded w-12 h-12 flex items-center justify-center bg-[#282828]">
                  <img className="w-6 brightness-65" src={assets.music_note_icon} alt="" />
                </div>
            }
            
            <div className="ml-3">
                <p className="font-semibold">{name}</p>         
                <p className="text-[#b3b3b3] text-sm">Playlist</p>         
            </div>
            {/* <button
                onClick={
                    (e) => {
                        e.stopPropagation();
                        handlePlayFirstSong();
                    }
                }
                className={`absolute bottom-[5.65rem] right-4 transition transform duration-[350ms] ${isHovered ? 'translate-y-[0rem] opacity-100' : 'translate-y-[0.5rem] opacity-0'}`}
            >
                <img src={assets.green_play_icon} alt="Play" className="w-12 hover:scale-105 active:scale-100" />
            </button> */}

        </div>
    );
};

export default PrivatePlaylistItem;