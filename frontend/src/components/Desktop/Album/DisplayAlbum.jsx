import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NavbarDesktop";
import { assets } from "../../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import LoginMessage from "../Message/LoginMessage";
import { AuthContext } from "../../../contexts/AuthContext";
import ModalMessage from "../Message/ModalMessage";
import LikeDropdown from "../LikeDropdownDesktop";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import DropdownInAlbum from "./DropdownInAlbum";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { playWithId, albumsData, songsData, track, setNavigationToAlbum } =
    useContext(PlayerContext);
  const { addSongToPlaylist } = useContext(PlaylistContext);
  const [isOpen, setOpen] = useState(false);
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { authState } = useContext(AuthContext);
  const [isLikeDropdownOpen, setLikeDropdownOpen] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const navigate = useNavigate();

  const handleOpenLikeDropdown = (e, songId) => {
    e.stopPropagation();
    setLikeDropdownOpen(!isLikeDropdownOpen);
    setSelectedSongId(songId);
  };

  const handleCloseLikeDropdown = () => {
    setLikeDropdownOpen(false);
  };

  const handleMessageClick = () => {
    setMessageOpen(true);
  };

  const handleModalClick = () => {
    setModalOpen(true);
  };

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const album = albumsData.find((item) => item._id === id);
    if (album) setAlbumData(album);
  }, [id, albumsData]);

  const parseDuration = (durationString) => {
    if (!durationString) return 0;
    const [minutes, seconds] = durationString.split(":").map(Number);
    return minutes * 60 + (seconds || 0);
  };

  const albumSongs = songsData.filter((song) => song.album === albumData?.name);
  const totalSongs = albumSongs.length;
  const totalDurationInSeconds = albumSongs.reduce((acc, song) => {
    const durationInSeconds = parseDuration(song.duration);
    return acc + durationInSeconds;
  }, 0);

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    return ` ${hours} hr ${minutes} min`;
  };

  const handlePlayFirstSong = () => {
    setNavigationToAlbum();

    const albumSongs = songsData.filter(
      (song) => song.album === albumData.name
    );
    if (albumSongs.length > 0) {
      playWithId(albumSongs[0]._id);
    }
  };

  const handleClick = (songId) => {
    playWithId(songId);
    setNavigationToAlbum();
  };

  const handleAddToPlaylists = async (songId) => {
    try {
      for (const playlistId of selectedPlaylists) {
        await addSongToPlaylist(playlistId, songId);
      }
      handleCloseLikeDropdown();
    } catch (error) {
      console.error("Error adding song to playlists:", error);
    }
  };

  return albumData ? (
    <>
      {isLikeDropdownOpen && (
        <LikeDropdown
          onClose={handleCloseLikeDropdown}
          onDone={(songId) => handleAddToPlaylists(songId)}
          setSelectedPlaylists={setSelectedPlaylists}
          selectedSongId={selectedSongId}
        />
      )}
      <div className="max-md:min-h-[calc(100vh+110px)]">
        <div className="max-md:mb-5">
          <div className="md:mt-10 flex gap-8 flex-col md:flex-row md:items-end">
            <div className="max-md:flex max-md:justify-center max-md:mb-5 max-md:mt-10">
              <div className="max-[340px]:relative">
                <img
                  onClick={() => navigate(-1)}
                  className="md:hidden absolute left-[20px] max-[340px]:left-[-60px] max-[320px]:left-[-55px] max-[310px]:left-[-47px] w-8 p-2"
                  src={assets.arrow_left}
                  alt="Go Back"
                />
                <img
                  className="md:w-48 rounded max-md:w-[190px] max-md:h-[190px]"
                  src={albumData.image}
                  alt={albumData.name}
                />
              </div>
            </div>
            <div className="flex flex-col max-md:ml-4">
              <p className="max-md:hidden">Album</p>
              <h2 className="max-md:hidden text-5xl font-bold mb-4 md:text-7xl">
                {albumData.name}
              </h2>
              <h4 className="max-md:text-[15px] max-md:text-gray-400 max-md:font-semibold max-md:font-[Metropolis]">
                {albumData.desc}
              </h4>
              <div className="mt-1 font-[Metropolis] font-medium max-md:text-gray-400 ">
                <div className="flex items-center">
                  <img
                    className="inline-block w-5"
                    src={assets.spotify_logo}
                    alt="Spotify"
                  />
                  <p className="ml-2 mr-1 font-bold">Spotify</p>
                </div>
                <p className="max-md:text-sm max-md:font-bold mt-1">
                  {formatDuration(totalDurationInSeconds)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-7 mt-7 max-md:gap-5 max-md:mt-5 max-md:ml-4">
            <img
              onClick={
                !authState.token ? handleModalClick : handlePlayFirstSong
              }
              className="w-14 max-md:w-12 cursor-pointer hover:brightness-150 hover:scale-105 active:scale-100 active:brightness-50"
              src={assets.green_play_icon}
              alt="Play"
            />
            <img
              className="w-8 max-md:w-6 cursor-pointer brightness-65 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50"
              src={assets.plus_border_icon}
              alt="Like"
            />

            <div className="relative">
              <img
                className="w-5 cursor-pointer brightness-65 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50"
                src={assets.more_icon}
                alt="More"
                onClick={toggleDropdown}
              />

              {isOpen && (
                <DropdownInAlbum
                  onClick={handleMessageClick}
                  setOpen={setOpen}
                />
              )}
            </div>
          </div>

          <div className="max-md:hidden">
            <div className="flex justify-between mt-10 mb-4 pl-2 text-[#a7a7a7]">
              <p className="font-[Metropolis] font-medium">
                <b className="ml-2 mr-4">#</b>Title
              </p>
              <img
                className="w-4 mt-2 mr-6"
                src={assets.clock_icon}
                alt="Clock"
              />
            </div>
            <hr className="brightness-50 mb-1" />
          </div>
        </div>

        {songsData
          .filter((item) => item.album === albumData.name)
          .map((item, index) => (
            <div
              onClick={
                !authState.token
                  ? handleModalClick
                  : () => handleClick(item._id)
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={item._id}
              className={`max-md:mx-3 flex justify-between gap-2 p-2 items-center rounded cursor-pointer relative
                        ${
                          hoveredIndex === index
                            ? "bg-[#ffffff40]"
                            : "text-[#b3b3b3]"
                        }`}
            >
              <div className="text-white flex items-center">
                {hoveredIndex === index ? (
                  <img
                    className="max-md:hidden ml-2 mr-[1.08rem] w-3"
                    src={assets.small_play_icon}
                    alt="Play Icon"
                  />
                ) : (
                  <b
                    className={`max-md:hidden ml-2 mr-5 text-[#b3b3b3]
                                    ${
                                      item._id === track?._id
                                        ? "text-green-400"
                                        : "text-[#b3b3b3]"
                                    }`}
                  >
                    {index + 1}
                  </b>
                )}
                <img
                  className="inline w-10 h-10 object-cover me-5"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <p
                    className={`font-[Metropolis] font-semibold text-[15px] cursor-pointer                           
                                    ${
                                      item._id === track?._id
                                        ? "text-green-400"
                                        : "text-white"
                                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="font-[Metropolis] font-semibold text-gray-400 text-sm cursor-pointer">
                    {item.desc.slice(0, 25)}
                  </p>
                </div>
              </div>
              {hoveredIndex === index && (
                <img
                  onClick={(e) => handleOpenLikeDropdown(e, item._id)}
                  className="max-md:hidden w-4 brightness-75 hover:brightness-100 hover:scale-[1.03] right-[90px] absolute"
                  src={assets.plus_border_icon}
                  alt=""
                />
              )}

              <p className="max-md:hidden font-[Metropolis] font-medium text-[15px] text-center mr-4">
                {item.duration}
              </p>
            </div>
          ))}
      </div>

      {isMessageOpen && (
        <LoginMessage
          isOpen={isMessageOpen}
          onClose={() => setMessageOpen(false)}
        />
      )}

      {isModalOpen && (
        <ModalMessage
          image={albumData.image}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  ) : null;
};

export default DisplayAlbum;
