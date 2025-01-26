import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import AlbumItem from "../Desktop/Album/AlbumItem";
import PrivatePlaylistItem from "../Desktop/Playlist/PrivatePlaylistItem";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import NavbarMobile from "./Other/NavbarMobile";

const DisplayHomeMobile = () => {
  const { albumsData } = useContext(PlayerContext);
  const { playlistsData } = useContext(PlaylistContext);

  return (
    <>
      <NavbarMobile />

      {playlistsData && playlistsData.length > 0 ? (
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h1 className="my-3 mx-4 font-bold text-xl text-white">
              My playlists
            </h1>
          </div>
          <div className="grid justify-center grid-cols-2 gap-1.5 mx-4">
            {playlistsData.map((item) => (
              <PrivatePlaylistItem
                key={item._id}
                name={item.name}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h1 className="my-3 mx-4 font-bold text-xl text-white">
            Featured Charts
          </h1>
        </div>
        <div className="grid justify-center grid-cols-2 gap-1.5 mx-4">
          {albumsData.map((item) => (
            <AlbumItem
              key={item._id}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHomeMobile;
