import Navbar from './Navbar';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../assets/assets';
import { PlayerContext } from '../contexts/PlayerContext';

const Search = () => {
  const location = useLocation();
  const [songs, setSongs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { track, playWithId, setNavigationToAll } = useContext(PlayerContext);

  const handleClick = (songId) => {
    playWithId(songId);
    setNavigationToAll();
  };

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/song/search?q=${query}`);
        setSongs(response.data.songs);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSongs();
    }
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[630px_minmax(0,1fr)_100px] mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p className="font-[Metropolis] font-medium">
          <b className="ml-2 mr-4">#</b>Title
        </p>
        <p className='font-[Metropolis] font-medium'>Album</p>
        <img className="w-4 mt-2 mr-6 ml-auto" src={assets.clock_icon} alt="Clock" />
      </div>
      <hr className="brightness-50 mb-1" />
      <div>
        {songs.map((song, index) => (
          <div
            key={song._id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(song._id)}
            className={`grid grid-cols-[630px_minmax(0,1fr)_100px] p-2 items-center rounded cursor-pointer
            ${hoveredIndex === index ? 'bg-[#ffffff40]' : 'text-[#b3b3b3]'}`}
          >
            <div className="text-white flex items-center">
              {hoveredIndex === index ? (
                <img className="ml-2 mr-[1.08rem] w-3" src={assets.small_play_icon} alt="Play Icon" />
              ) : (
                <b
                  className={`ml-2 mr-5 text-[#b3b3b3]
                  ${song._id === track?._id ? 'text-green-400' : 'text-[#b3b3b3]'}`}
                >
                  {index + 1}
                </b>
              )}
              <img className="inline w-10 me-5" src={song.image} alt={song.name} />
              <div>
                <p
                  className={`font-[Metropolis] font-semibold text-[15px] cursor-pointer
                  ${song._id === track?._id ? 'text-green-400' : 'text-white'}`}
                >
                  {song.name}
                </p>
                <p className="font-[Metropolis] font-semibold text-gray-400 text-sm cursor-pointer">
                  {song.desc.slice(0, 25)}
                </p>
              </div>
            </div>
            <p className="font-[Metropolis] font-medium text-[15px]">{song.album}</p>
            <p className="font-[Metropolis] font-medium text-[15px] mr-4 ml-auto">{song.duration}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;