import { useContext } from "react";
import DisplayMobile from "./components/Mobile/DisplayMobile";
import { PlayerContext } from "./contexts/PlayerContext";

const Mobile = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <DisplayMobile />

      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};

export default Mobile;
