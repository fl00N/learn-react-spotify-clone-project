import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../contexts/PlayerContext";

const Player = () => {
    const {
        track, seekBg, seekBar, playStatus, play, pause, time, previous, next, seekSong,
        setVolume: setPlayerVolume, volume, shuffle, repeat, isShuffle, isRepeat, isMuted, toggleMute
    } = useContext(PlayerContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isSeekBarHovered, setIsSeekBarHovered] = useState(false);

    const handleSliderChange = (e) => {
        let newVolume = parseFloat(e.target.value);
        newVolume = Math.max(0, Math.min(1, newVolume));
        setPlayerVolume(newVolume);
    };

    return (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4">
                    {track 
                        ? <div className="hidden lg:flex items-center gap-4">
                            <img className="w-14 h-14 object-cover mb-1 rounded" src={track.image} alt="" />
                            <div>
                                <p className="font-[Metropolis] font-semibold text-sm cursor-pointer">{track.name}</p>
                                <p className="font-[Metropolis] font-medium text-gray-400 text-[13px] cursor-pointer">{track.desc.slice(0, 25)}</p>
                            </div>
                        </div> 
                        : null
                    }
            </div>
            <div className="flex flex-col items-center gap-1 absolute left-[50%] translate-x-[-50%]">
                <div className="flex items-center gap-6">
                    <img
                        onClick={shuffle}
                        className={`w-4 opacity-75 hover:opacity-100 hover:scale-105 active:scale-100 active:opacity-50 cursor-pointer ${!track ? 'pointer-events-none opacity-[20%]' : ''}`}
                        src={assets.shuffle_icon}
                        alt="Shuffle"
                        style={{ filter: isShuffle ? 'invert(40%) sepia(100%) saturate(200%) hue-rotate(90deg)' : 'none' }}
                    />
                    <img
                        onClick={previous}
                        className={`w-4 brightness-75 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50 cursor-pointer ${!track ? 'pointer-events-none brightness-[20%]' : ''}`}
                        src={assets.prev_icon}
                        alt="Previous"
                    />
                    {playStatus
                        ? <img onClick={pause} className={`w-8 hover:scale-105 hover:brightness-90 active:scale-100 active:brightness-65 cursor-pointer ${!track ? 'pointer-events-none brightness-[20%]' : ''}`} src={assets.pause_icon} alt="Pause" />
                        : <img onClick={play} className={`w-8 hover:scale-105 hover:brightness-90 active:scale-100 active:brightness-65 cursor-pointer ${!track ? 'pointer-events-none brightness-[20%]' : ''}`} src={assets.play_icon} alt="Play" />
                    }
                    <img
                        onClick={next}
                        className={`w-4 brightness-75 hover:brightness-100 hover:scale-105 active:scale-100 active:brightness-50 cursor-pointer ${!track ? 'pointer-events-none brightness-[20%]' : ''}`}
                        src={assets.next_icon}
                        alt="Next"
                    />
                    <img
                        onClick={repeat}
                        className={`w-4 opacity-75 hover:opacity-100 hover:scale-105 active:scale-100 active:opacity-50 cursor-pointer ${!track ? 'pointer-events-none opacity-[20%]' : ''}`}
                        src={assets.loop_icon}
                        alt="Repeat"
                        style={{ filter: isRepeat ? 'invert(40%) sepia(100%) saturate(200%) hue-rotate(90deg)' : 'none' }}
                    />
                </div>
                <div className="flex items-center gap-2 font-[Metropolis] font-medium">
                    <p className="text-gray-400 text-xs">
                        {track 
                            ? `${time?.currentTime ? `${time.currentTime.minute}:${time.currentTime.second.toString().padStart(2, '0')}` : "00:00"}` 
                            : <span className="brightness-50">--:--</span>
                        }
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className={`w-[60vw] max-w-[500px] rounded-full cursor-pointer ${!track ? 'pointer-events-none brightness-[20%]' : ''} ${isSeekBarHovered ? 'bg-gray-500' : 'bg-zinc-600'}`}
                        onMouseEnter={() => setIsSeekBarHovered(true)}
                        onMouseLeave={() => setIsSeekBarHovered(false)}
                    >
                        <hr
                            ref={seekBar}
                            className={`h-1 border-none w-0 rounded-full ${isSeekBarHovered ? 'bg-green-400' : 'bg-white'}`}
                        />
                    </div>
                    <p className="text-gray-400 text-xs">
                        {track
                        ? `${time?.totalTime ? `${time.totalTime.minute}:${time.totalTime.second.toString().padStart(2, '0')}` : "00:00"}`
                        : <span  className="brightness-50">--:--</span>
                        }
                    </p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 opacity-75">
                <img className="w-4 brightness-100 hover:brightness-125 hover:scale-105 active:scale-100 active:brightness-65 cursor-pointer" src={assets.plays_icon} alt="Playlists" />
                <img className="w-4 ml-1 brightness-100 hover:brightness-125 hover:scale-105 active:scale-100 active:brightness-65 cursor-pointer" src={assets.mic_icon} alt="Microphone" />
                <img className="w-4 ml-1 brightness-100 hover:brightness-125 hover:scale-105 active:scale-100 active:brightness-65 cursor-pointer" src={assets.queue_icon} alt="Queue" />
                <img className="w-4 ml-1 brightness-100 hover:brightness-125 hover:scale-105 active:scale-100 active:brightness-65 cursor-pointer" src={assets.speaker_icon} alt="Speaker" />
                <div className="flex items-center relative">
                    <img 
                        onClick={toggleMute}
                        className="w-4 ml-1 mr-2 brightness-100 hover:brightness-125 hover:scale-105 active:scale-100 active:brightness-65 cursor-pointer" 
                        src={isMuted ? assets.mute_icon : assets.volume_icon}
                        alt="Volume" 
                    />
                    <div
                        className={`relative w-20 h-1 ${isHovered ? 'bg-zinc-600' : 'bg-zinc-600'} rounded-full cursor-pointer`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={(e) => {
                            const newVolume = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
                            setPlayerVolume(Math.max(0, Math.min(1, newVolume)));
                        }}
                    >
                        {isMuted 
                                ?<input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleSliderChange}
                                    disabled
                                    className='absolute top-[-6px] w-full opacity-0 cursor-not-allowed'
                                />
                            :   <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleSliderChange}
                                    className='absolute top-[-6px] w-full opacity-0 cursor-pointer'
                                />

                        }
                        <div
                            className={`absolute top-0 left-0 h-1 ${isHovered ? 'bg-green-400' : 'bg-white'} rounded-full`}
                            style={{ width: `${volume * 100}%` }}
                        />
                    </div>
                </div>
                <img className="w-4 ml-2 brightness-100 hover:brightness-125 hover:scale-105 active:scale-100 active:brightness-65 cursor-pointer" src={assets.mini_player_icon} alt="Mini Player" />
                <img className="w-4 ml-1 brightness-100 hover:brightness-125 hover:scale-105 active:scale-100 active:brightness-65 cursor-pointer" src={assets.zoom_icon} alt="Zoom" />
            </div>
        </div>
    )
};

export default Player;
