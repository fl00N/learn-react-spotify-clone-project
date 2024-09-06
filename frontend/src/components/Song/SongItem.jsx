import { useContext, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { AuthContext } from "../../contexts/AuthContext";
import ModalMessage from "../Message/ModalMessage";

const SongItem = ({ image, name, desc, id }) => {
  const { playWithId, setNavigationToAll } = useContext(PlayerContext);
  const { authState } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    playWithId(id);
    setNavigationToAll();
  };

  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div
        onClick={!authState.token ? handleModalClick : handleClick}
        className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
      >
        <img className="rounded" src={image} alt={name} />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">{desc}</p>
      </div>
      {isModalOpen && (
        <ModalMessage
          image={image}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SongItem;
