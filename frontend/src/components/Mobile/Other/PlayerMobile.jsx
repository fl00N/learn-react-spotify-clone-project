import { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { assets } from "../../../assets/assets";

const PlayerMobile = () => {
  const { track, play, pause, playStatus } = useContext(PlayerContext);
  return (
    <>
      {track ? (
        <div className="flex justify-center">
          <div className="px-4 fixed bottom-[75px] bg-black w-[95%] h-[10%] flex justify-between items-center rounded-xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10 object-cover rounded"
                  src={track.image}
                  alt=""
                />
                <div>
                  <p className="font-[Metropolis] font-semibold text-sm text-white">
                    {track.name}
                  </p>
                  <p className="font-[Metropolis] font-medium text-gray-400 text-[13px]">
                    {track.desc.slice(0, 25)}
                  </p>
                </div>
              </div>
            </div>

            {playStatus ? (
              <img
                onClick={pause}
                className="w-5"
                src={assets.small_pause_icon}
                alt="Pause"
              />
            ) : (
              <img
                onClick={play}
                className="w-5"
                src={assets.small_play_icon}
                alt="Play"
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PlayerMobile;
