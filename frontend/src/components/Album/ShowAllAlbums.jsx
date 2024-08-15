import Navbar from "../Navbar";
import AlbumItem from "./AlbumItem";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const ShowAllAlbums = () => {
  const { albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="my-5 font-bold text-2xl">All Albums</h1>
        <div className="grid grid-cols-6 gap-50">
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

export default ShowAllAlbums;