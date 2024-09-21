import { useContext, useEffect, useRef } from "react"
import DisplayAlbum from "./Album/DisplayAlbum"
import DisplayPlaylist from "./Playlist/DisplayPlaylist"
import DisplayHome from "./DisplayHome"
import { Route, Routes, useLocation } from 'react-router-dom'
import { PlayerContext } from "../contexts/PlayerContext"
import Search from "./Search"
import ShowAllAlbums from "./Album/ShowAllAlbums"
import { PlaylistContext } from "../contexts/PlaylistContext"

const Display = () => {

  const { albumsData } = useContext(PlayerContext)
  const { playlistsData } = useContext(PlaylistContext)
  const displayRef = useRef()
  const location = useLocation()

  const isAlbum = location.pathname.includes('album');
  const isPlaylist = location.pathname.includes('playlist');
  
  const id = isAlbum || isPlaylist ? location.pathname.split('/').pop() : '';

  const album = isAlbum ? albumsData.find((x) => x._id === id) : null;
  const playlist = isPlaylist ? playlistsData.find((x) => x._id === id) : null;
  
  const bgColor = isAlbum && album ? album.bgColor : '#121212';

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(${bgColor}, #121212)`
        : '#121212';
    }
  }, [isAlbum, bgColor, albumsData]);

  return (
    <div ref={displayRef} className="scroll-container w-[100%] m-2 px-6 pt-4 rounded-lg bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        {albumsData.length > 0 || playlistsData.length > 0 ? (
            <Routes>
                <Route path='/' element={<DisplayHome />} />
                <Route path='/album/:id' element={<DisplayAlbum album={album} />} />
                <Route path='/playlist/:id' element={<DisplayPlaylist playlist={playlist} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/show-all-albums" element={<ShowAllAlbums />} />
            </Routes>
        ) : null}
    </div>
  )
}

export default Display