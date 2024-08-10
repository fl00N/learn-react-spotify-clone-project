import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { playWithId, albumsData, songsData, track, setNavigationToAlbum } = useContext(PlayerContext);

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
                <img className="w-8 cursor-pointer brightness-65 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50" src={assets.like_icon} alt="Like" />
                <img className="w-5 cursor-pointer brightness-65 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50" src={assets.more_icon} alt="More" />
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
                        <p className="text-white flex items-center">
                            { hoveredIndex === index ? (
                                <img className="ml-2 mr-[1.05rem] w-3" src={assets.small_play_icon} alt="Play Icon" />
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
                                    className={`font-[Metropolis] font-semibold text-sm cursor-pointer text-white                                  
                                    ${item._id === track?._id ? 'text-green-400' : 'text-[#b3b3b3]'}`}
                                >
                                    {item.name}
                                </p>
                                <p className="font-[Metropolis] font-semibold text-gray-400 text-sm cursor-pointer">{item.desc.slice(0, 25)}</p>
                            </div>
                        </p>
                        <p className="font-[Metropolis] font-medium text-[15px] text-center mr-4">{item.duration}</p>
                    </div>
                ))
            }
        </>
    ) : null;
}

export default DisplayAlbum;
