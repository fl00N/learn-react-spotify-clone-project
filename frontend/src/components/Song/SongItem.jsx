/* eslint-disable react/prop-types */
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const SongItem = ({ image, name, desc, id }) => {
  const { playWithId, setNavigationToAll } = useContext(PlayerContext);

  const handleClick = () => {
    playWithId(id);
    setNavigationToAll();
  };

  return (
    <div
      onClick={handleClick}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
