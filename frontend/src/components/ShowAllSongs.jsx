import Navbar from "./Navbar";
import SongItem from "./SongItem";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const ShowAllSongs = () => {
  const { songsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="my-5 font-bold text-2xl">All Songs</h1>
        <div className="grid grid-cols-6 gap-50">
          {songsData.map((item) => (
            <SongItem
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

export default ShowAllSongs;
