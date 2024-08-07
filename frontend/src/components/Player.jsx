import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
    const {
        track, seekBg, seekBar, playStatus, play, pause, time, previous, next, seekSong,
        setVolume, volume, shuffle, repeat, isShuffle, isRepeat
    } = useContext(PlayerContext);
    const [isHovered, setIsHovered] = useState(false);

    return track ? (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12 c" src={track.image} alt="" />
                <div>
                    <p className="font-[Metropolis] font-semibold text-sm cursor-pointer">{track.name}</p>
                    <p className="font-[Metropolis] font-semibold text-gray-400 text-sm cursor-pointer">{track.desc.slice(0, 25)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-3 absolute left-[50%] translate-x-[-50%]">
                <div className="flex gap-6">
                <img
                        onClick={shuffle}
                        className="w-4 brightness-65 hover:brightness-100 cursor-pointer"
                        src={assets.shuffle_icon}
                        alt="Shuffle"
                        style={{ filter: isShuffle ? 'invert(40%) sepia(100%) saturate(200%) hue-rotate(90deg)' : 'none' }}
                    />
                    <img
                        onClick={previous}
                        className="w-4 brightness-65 hover:brightness-100 cursor-pointer"
                        src={assets.prev_icon}
                        alt="Previous"
                    />
                    {playStatus
                        ? <img onClick={pause} className="w-4 hover:scale-110 cursor-pointer" src={assets.pause_icon} alt="Pause" />
                        : <img onClick={play} className="w-4 hover:scale-110 cursor-pointer" src={assets.play_icon} alt="Play" />
                    }
                    <img
                        onClick={next}
                        className="w-4 brightness-65 hover:brightness-100 cursor-pointer"
                        src={assets.next_icon}
                        alt="Next"
                    />
                    <img
                        onClick={repeat}
                        className="w-4 brightness-65 hover:brightness-100 cursor-pointer"
                        src={assets.loop_icon}
                        alt="Repeat"
                        style={{ filter: isRepeat ? 'invert(40%) sepia(100%) saturate(200%) hue-rotate(90deg)' : 'none' }}
                    />
                </div>
                <div className="flex items-center gap-2 font-[Metropolis] font-medium">
                    <p className="text-gray-400 text-xs">{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</p>
                    <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-zinc-600 rounded-full cursor-pointer">
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-white rounded-full"/>
                    </div>
                    <p className="text-gray-400 text-xs">{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 opacity-75">
                <img className="w-4 brightness-[.8] hover:brightness-100 hover:scale-105 cursor-pointer" src={assets.plays_icon} alt="Playlists" />
                <img className="w-4 ml-1 brightness-[.8] hover:brightness-100 hover:scale-105 cursor-pointer" src={assets.mic_icon} alt="Microphone" />
                <img className="w-4 ml-1 brightness-[.8] hover:brightness-100 hover:scale-105 cursor-pointer" src={assets.queue_icon} alt="Queue" />
                <img className="w-4 ml-1 brightness-[.8] hover:brightness-100 hover:scale-105 cursor-pointer" src={assets.speaker_icon} alt="Speaker" />
                <div className="flex items-center relative">
                    <img className="w-4 ml-1 mr-2 brightness-[.8] hover:brightness-100 cursor-pointer" src={assets.volume_icon} alt="Volume" />
                    <div
                        className={`relative w-20 h-1 ${isHovered ? 'bg-zinc-600' : 'bg-zinc-600'} rounded-full cursor-pointer`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={(e) => setVolume(e.nativeEvent.offsetX / e.currentTarget.offsetWidth)}
                    >
                        <div
                            className={`absolute top-0 left-0 h-1 ${isHovered ? 'bg-green-400' : 'bg-white'} rounded-full`}
                            style={{ width: `${volume * 100}%` }}
                        />
                    </div>
                </div>
                <img className="w-4 ml-2 brightness-[.8] hover:brightness-100 hover:scale-105 cursor-pointer" src={assets.mini_player_icon} alt="Mini Player" />
                <img className="w-4 ml-1 brightness-[.8] hover:brightness-100 hover:scale-105 cursor-pointer" src={assets.zoom_icon} alt="Zoom" />
            </div>
        </div>
    ) : null;
};

export default Player;