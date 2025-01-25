import { useContext } from "react";
import Display from "./components/Desktop/DisplayDesktop";
import Player from "./components/Desktop/PlayerDesktop";
import SideBar from "./components/Desktop/SideBarDesktop";
import { PlayerContext } from "./contexts/PlayerContext";

export const Desktop = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 && (
        <>
          <div className="h-[90%] flex">
            <SideBar />
            <Display />
          </div>
          <Player />
        </>
      )}
      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};
