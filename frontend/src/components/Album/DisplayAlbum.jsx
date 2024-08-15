import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import LoginMessage from "../LoginMessage";

const DisplayAlbum = () => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const { playWithId, albumsData, songsData, track, setNavigationToAlbum } = useContext(PlayerContext);    
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreatePlaylistClick = () => {
        setIsModalOpen(true);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const album = albumsData.find(item => item._id === id);
        if (album) setAlbumData(album);
    }, [id, albumsData]);

    const handlePlayFirstSong = () => {
        setNavigationToAlbum();

        const albumSongs = songsData.filter(song => song.album === albumData.name);
        if (albumSongs.length > 0) {
            playWithId(albumSongs[0]._id);
        }
    };

    const handleClick = (songId) => {
        playWithId(songId);
        setNavigationToAlbum();
      };

    return albumData ? (
        <>
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
                <div className="flex flex-col">
                    <p>Album</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <div className="mt-1 font-[Metropolis] font-medium">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="Spotify" />
                        <b className="ml-2 mr-1">Spotify</b>
                        • 1,323,154 likes
                        • 50 songs,
                        2 hr 30 min
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-7 mt-7">
                <img onClick={handlePlayFirstSong} className="w-14 cursor-pointer hover:brightness-150 hover:scale-105 active:scale-100 active:brightness-50" src={assets.green_play_icon} alt="Play" />
                <img className="w-8 cursor-pointer brightness-65 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50" src={assets.plus_border_icon} alt="Like" />

                <div className='relative'>
                    <img 
                        className="w-5 cursor-pointer brightness-65 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50" 
                        src={assets.more_icon} 
                        alt="More"
                        onClick={toggleDropdown}
                    />

                    {isOpen && (
                        <div className='absolute left-[-0.5rem] mt-4 w-[12.5rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
                            <ul className='py-2 px-1'>
                                <li className='flex items-center px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'>
                                    <img className="w-4 brightness-75" src={assets.plus_border_icon} alt="" />
                                    <p className="font-medium text-sm text-[#ffffffE6] px-2.5">Add to Your Library</p>
                                </li>

                                <li 
                                    className='flex items-center justify-between px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'
                                    onMouseEnter={() => setHoveredItem('playlist')}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="flex items-center">
                                        <img className="w-4 brightness-75" src={assets.plus_icon} alt="" />
                                        <p className="font-medium text-sm text-[#ffffffE6] px-2.5">Add to Playlist</p>
                                    </div>
                                    <img className="w-3" src={assets.arrow_filled_icon} alt="" />

                                    {hoveredItem === 'playlist' && (
                                        <div className='absolute left-[12rem] top-10 w-[16rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
                                            <ul className='py-2 px-2'>
                                            <div className="flex items-center relative">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Find a playlist"
                                                        className='w-full pl-10 py-2 bg-[#383838] text-sm text-white rounded font-semibold focus:outline-none placeholder-gray-400'
                                                    />            
                                                    <img
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4"
                                                        src={assets.search_icon} 
                                                        alt="Search Icon" 
                                                    />
                                            </div>
                                                <li className='flex items-center mt-1 px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'>
                                                    <img className="w-4" src={assets.plus_icon} alt="" />
                                                    <p 
                                                        className="font-semibold text-sm text-[#ffffffE6] px-3"
                                                        onClick={() => {
                                                            handleCreatePlaylistClick();
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        Create playlist
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>

                                <li 
                                    className='flex items-center justify-between px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'
                                    onMouseEnter={() => setHoveredItem('share')}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="flex items-center">
                                        <img className="w-4 brightness-75" src={assets.share_icon} alt="" />
                                        <p className="font-medium text-sm text-[#ffffffE6] px-2.5">Share</p>
                                    </div>
                                    <img className="w-3" src={assets.arrow_filled_icon} alt="" />

                                    {hoveredItem === 'share' && (
                                        <div className='absolute left-[12.2rem] top-20 w-[11rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
                                            <ul className='py-2 px-1'>
                                                <li className='flex items-center justify-between px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'>
                                                    <img className="w-4" src={assets.copy_icon} alt="" />
                                                    <p className="font-semibold text-sm text-[#ffffffE6] px-2">Copy Album Link</p>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
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
                songsData.filter((item) => item.album === albumData.name).map((item, index) => (
                    <div
                        onClick={() => handleClick(item._id)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        key={item._id}
                        className={`flex justify-between gap-2 p-2 items-center rounded cursor-pointer
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
                            <img className="inline w-10 me-5" src={item.image} alt={item.name} />
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
                        <p className="font-[Metropolis] font-medium text-[15px] text-center mr-4">{item.duration}</p>
                    </div>
                ))
            }

            {isModalOpen && (
                <LoginMessage 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    ) : null;
}

export default DisplayAlbum;
