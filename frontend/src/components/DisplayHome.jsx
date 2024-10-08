/* eslint-disable react/no-unescaped-entities */
import Navbar from "./Navbar";
import AlbumItem from "./Album/AlbumItem";
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { useNavigate } from "react-router-dom";

const DisplayHome = () => {
  const { albumsData } = useContext(PlayerContext);
  const navigate = useNavigate();
  const visibleAlbums = albumsData.slice(0, 6);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
          <p
            onClick={() => navigate('/show-all-albums')}
            className="mr-4 mt-10 font-[Metropolis] font-bold text-[#b3b3b3] text-[0.9rem] cursor-pointer hover:underline hover:decoration-[1.5px]"
          >
            Show all
          </p>
        </div>
        <div className="flex overflow-auto">
          {visibleAlbums.map((item) => (
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

export default DisplayHome;
