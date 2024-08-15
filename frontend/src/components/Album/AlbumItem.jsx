/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { assets } from "../../assets/assets";

const AlbumItem = ({ image, name, desc, id }) => {
    const navigate = useNavigate();
    const { songsData, playWithId, setNavigationToAlbum } = useContext(PlayerContext);
    const [isHovered, setIsHovered] = useState(false);

    const handlePlayFirstSong = () => {
        setNavigationToAlbum();

        const albumSongs = songsData.filter(song => song.album === name);
        console.log(albumSongs);
        
        if (albumSongs.length > 0) {
            playWithId(albumSongs[0]._id);
        }
    };

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
            onClick={() => navigate(`/album/${id}`)}
        >
            <img className="rounded" src={image} alt={name} />
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
            
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handlePlayFirstSong();
                }}
                className={`absolute bottom-[5.65rem] right-4 transition-all transform duration-500 ${isHovered ? 'translate-y-[0rem] opacity-100' : 'translate-y-[0.5rem] opacity-0'} hover:scale-105 active:scale-100`}
            >
                <img src={assets.green_play_icon} alt="Play" className="w-12" />
            </button>
        </div>
    );
};

export default AlbumItem;