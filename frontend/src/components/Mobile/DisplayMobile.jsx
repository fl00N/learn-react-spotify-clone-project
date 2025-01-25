import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHomeMobile from "./DisplayHomeMobile";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import DisplayAlbum from "../Desktop/Album/DisplayAlbum";
import DisplayPlaylist from "../Desktop/Playlist/DisplayPlaylist";
import FooterMobile from "./Other/FooterMobile";

const DisplayMobile = () => {
  const { albumsData } = useContext(PlayerContext);
  const { playlistsData } = useContext(PlaylistContext);
  const displayRef = useRef();
  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  const isPlaylist = location.pathname.includes("playlist");

  const id = isAlbum || isPlaylist ? location.pathname.split("/").pop() : "";

  const album = isAlbum ? albumsData.find((x) => x._id === id) : null;
  const playlist = isPlaylist ? playlistsData.find((x) => x._id === id) : null;

  const bgColor = isAlbum && album ? album.bgColor : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(${bgColor}, #121212)`
        : "#121212";
    }
  }, [isAlbum, bgColor, albumsData]);

  return (
    <>
      <Routes>
        <Route path="/" element={<DisplayHomeMobile />} />
        <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
        <Route
          path="/playlist/:id"
          element={<DisplayPlaylist playlist={playlist} />}
        />
      </Routes>

      <FooterMobile />
    </>
  );
};

export default DisplayMobile;
