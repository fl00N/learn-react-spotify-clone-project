import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHomeMobile from "./DisplayHomeMobile";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import DisplayAlbum from "../Desktop/Album/DisplayAlbum";
import DisplayPlaylist from "../Desktop/Playlist/DisplayPlaylist";
import FooterMobile from "./Other/FooterMobile";
import PlayerMobile from "./Other/PlayerMobile";
import SearchMobile from "./Other/SearchMobile";
import LibraryMobile from "./Other/LibraryMobile";

const DisplayMobile = () => {
  const { albumsData } = useContext(PlayerContext);
  const { playlistsData } = useContext(PlaylistContext);
  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  const isPlaylist = location.pathname.includes("playlist");

  const id = isAlbum || isPlaylist ? location.pathname.split("/").pop() : "";

  const album = isAlbum ? albumsData.find((x) => x._id === id) : null;
  const playlist = isPlaylist ? playlistsData.find((x) => x._id === id) : null;

  return (
    <>
      <Routes>
        <Route path="/" element={<DisplayHomeMobile />} />
        <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
        <Route
          path="/playlist/:id"
          element={<DisplayPlaylist playlist={playlist} />}
        />
        <Route path="/search" element={<SearchMobile />} />
        <Route path="/library" element={<LibraryMobile />} />
      </Routes>

      <PlayerMobile />
      <FooterMobile />
    </>
  );
};

export default DisplayMobile;
