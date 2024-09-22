import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import { useEditModal } from "../../contexts/EditModalContext";

const DisplayPlaylist = () => {
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { playWithId, track, setNavigationToPlaylist } = useContext(PlayerContext);    
    const { playlistsData, removePlaylist, removeSongFromPlaylist } = useContext(PlaylistContext);    
    const { openEditModal } = useEditModal(); 
    const [isOpen, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate()
    const dropdownRef = useRef(null);

    const handleDelete = () => {
        if (playlistData) {
            removePlaylist(playlistData._id);
            setOpen(false);
        }
        navigate('/')
    };

    const toggleDropdown = () => {
        setOpen(!isOpen);
    };

    const parseDuration = (durationString) => {
        const [minutes, seconds] = durationString.split(':').map(Number);
        return (minutes * 60) + (seconds || 0);
    };

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        return `${hours} hr ${minutes} min`;
    };

    const totalSongs = playlistData ? playlistData.songs.length : 0;
   
    const totalDurationInSeconds = playlistData
        ? playlistData.songs.reduce((acc, song) => {
            const durationInSeconds = parseDuration(song.duration);
            return acc + durationInSeconds;
        }, 0)
        : 0;

    const formattedDuration = formatDuration(totalDurationInSeconds);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const playlist = playlistsData.find(item => item._id === id);
        if (playlist) setPlaylistData(playlist);
    }, [id, playlistsData]);

    const handlePlayFirstSong = () => {
        setNavigationToPlaylist();

        const playlistSongs = playlistData.songs;
        
        if (playlistSongs.length > 0) {
            playWithId(playlistSongs[0]._id);
        }
    };

    const handleClick = (songId) => {
        playWithId(songId);
        setNavigationToPlaylist();
    };

    const hasSongs = playlistData && playlistData.songs.length > 0;

    const handleRemoveSong = (e, songId) => {
        e.stopPropagation();
        
        if (playlistData) {
            removeSongFromPlaylist(playlistData._id, songId);
        }
    };

    return playlistData ? (
        <>
            <Navbar />

            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
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
                                        alt='Edit'
                                    />
                                    <p className="absolute bottom-6 text-sm font-semibold">Choose a photo</p>
                                </div>
                            ) : (
                                    <img 
                                        onClick={() => openEditModal(playlistData)}
                                        className="w-36 h-36 rounded object-cover"
                                        src={playlistData.image} 
                                        alt={playlistData.name}
                                    />
                                )
                            }
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
                                    alt='Edit'
                                />
                                {isHovered && <p className="absolute bottom-6 text-sm font-semibold">Choose a photo</p>}
                            </div>
                    </div>
                    )
                }

                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 
                        onClick={() => openEditModal(playlistData)}
                        className="text-5xl font-bold mb-4 md:text-7xl cursor-pointer"
                    >
                        {playlistData.name}
                    </h2>
                    <h4>{playlistData.desc}</h4>
                    <div className="mt-1 font-[Metropolis] font-medium">
                        {totalSongs} songs, {formattedDuration}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-7 mt-7">
                {hasSongs && (
                    <img 
                        onClick={handlePlayFirstSong} 
                        className="w-14 cursor-pointer hover:brightness-150 hover:scale-105 active:scale-100 active:brightness-50" 
                        src={assets.green_play_icon} 
                        alt="Play" 
                    />
                )}
                <div className='relative' ref={dropdownRef}>
                    <img 
                        className="w-5 cursor-pointer brightness-65 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50" 
                        src={assets.more_icon} 
                        alt="More"
                        onClick={toggleDropdown}
                    />

                    {isOpen && (
                        <div className='absolute left-[-0.5rem] mt-4 w-[12.5rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
                            <ul className='py-2 px-1'>
                                <li 
                                    onClick={() => openEditModal(playlistData)} 
                                    className="flex items-center font-medium py-2 px-2 text-[#ffffffe6] cursor-pointer hover:bg-[#ffffff23] rounded"
                                >
                                    <img className='w-4 mr-4 brightness-75' src={assets.pencil_icon} alt="" />
                                    Edit Details
                                </li>
                                <li 
                                    onClick={handleDelete}
                                    className="flex items-center font-medium py-2 px-2 text-[#ffffffe6] cursor-pointer hover:bg-[#ffffff23] rounded"
                                >
                                    <img className='w-4 mr-4 brightness-75' src={assets.minus_icon} alt="" />
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-between mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p className="font-[Metropolis] font-medium"><b className="ml-2 mr-4">#</b>Title</p>
                <img className="w-4 mt-2 mr-6" src={assets.clock_icon} alt="Clock" />
            </div>
            <hr className="brightness-50 mb-1" />
            {
                playlistData.songs.map((item, index) => (
                    <div
                        onClick={() => handleClick(item._id)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        key={item._id}
                        className={`flex justify-between gap-2 p-2 items-center rounded cursor-pointer relative
                        ${hoveredIndex === index ? 'bg-[#ffffff40]' : 'text-[#b3b3b3]'}`}
                    >
                        <div className="text-white flex items-center">
                            { hoveredIndex === index ? (
                                <img className="ml-2 mr-[1.08rem] w-3" src={assets.small_play_icon} alt="Play Icon" />
                            ) : (
                                <b 
                                    className={`ml-2 mr-5 text-[#b3b3b3]
                                    ${item._id === track?._id ? 'text-green-400' : 'text-[#b3b3b3]'}`}
                                >
                                    {index + 1}
                                </b>
                            )}
                            <img className="inline w-10 h-10 object-cover me-5" src={item.image} alt={item.name} />
                            <div>
                                <p 
                                    className={`font-[Metropolis] font-semibold text-[15px] cursor-pointer                           
                                    ${item._id === track?._id ? 'text-green-400' : 'text-white'}`}
                                >
                                    {item.name}
                                </p>
                                <p className="font-[Metropolis] font-semibold text-gray-400 text-sm cursor-pointer">{item.desc.slice(0, 25)}</p>
                            </div>
                        </div>
                        {hoveredIndex === index && 
                            <img                             
                                onClick={(e) => handleRemoveSong(e, item._id)}
                                className="w-4 brightness-150 hover:brightness-100 right-[90px] absolute"
                                src={assets.black_tick_icon}
                                alt="" 
                            />
                        }
                        <p className="font-[Metropolis] font-medium text-[15px] text-center mr-4">{item.duration}</p>
                    </div>
                ))
            }
        </>
    ) : null;
}

export default DisplayPlaylist;
