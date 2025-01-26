import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { PlayerContext } from "../../../contexts/PlayerContext";
import axios from "axios";

const SearchMobile = () => {
  const { track, playWithId, setNavigationToAll } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  const handleClick = (songId) => {
    playWithId(songId);
    setNavigationToAll();
  };

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + `/api/song/search?q=${query}`
        );
        setSongs(response.data.songs);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSongs();
    }
  }, [query]);

  return (
    <div className="h-[calc(100vh+100px)]">
      <div className="px-2 py-6">
        <form
          onSubmit={handleSearch}
          role="search"
          className="relatve flex items-center rounded-full brightness-75 bg-[#303030] hover:brightness-100"
        >
          <img
            className="absolute left-4 w-[18px] z-10"
            src={assets.search_icon}
            alt="Search Icon"
          />
          <input
            className="bg-[#303030] w-full rounded-full py-3 pl-12 placeholder:text-[#b3b3b310e] placeholder:font-[Metropolis] placeholder:text-sm placeholder:font-medium outline-white focus:outline focus:outline-[3px]"
            type="text"
            placeholder="What do you want to play?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div>
        {songs.map((song, index) => (
          <div
            key={song._id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(song._id)}
            className={`grid p-2 items-center rounded cursor-pointer
            ${hoveredIndex === index ? "bg-[#ffffff40]" : "text-[#b3b3b3]"}`}
          >
            <div className="text-white flex items-center">
              <img
                className="inline w-10 me-5"
                src={song.image}
                alt={song.name}
              />
              <div>
                <p
                  className={`font-[Metropolis] font-semibold text-[15px] cursor-pointer
                  ${song._id === track?._id ? "text-green-400" : "text-white"}`}
                >
                  {song.name}
                </p>
                <p className="font-[Metropolis] font-semibold text-gray-400 text-sm cursor-pointer">
                  {song.desc.slice(0, 25)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMobile;
