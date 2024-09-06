/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'http://localhost:4000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });
    const [volume, setVolume] = useState(0.1);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [navigationMode, setNavigationMode] = useState('album');
    const [isMuted, setIsMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(0.1);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const mute = () => {
        if (audioRef.current) {
            setPrevVolume(audioRef.current.volume);
            audioRef.current.muted = true;
            setIsMuted(true);
            setVolume(0);
        }
    };
    
    
    const unmute = () => {
        if (audioRef.current) {
            audioRef.current.muted = false;
            setIsMuted(false);
            setVolume(prevVolume);
            audioRef.current.volume = prevVolume;
        }
    };
    
    
    const toggleMute = () => {
        if (isMuted) {
            unmute();
        } else {
            mute();
        }
    };

    const playWithId = async (id) => {
        const song = songsData.find(item => item._id === id);
        if (song) {
            setTrack(song);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const previous = async () => {
        if (track) {
            if (navigationMode === 'album') {
                const albumSongs = songsData.filter(song => song.album === track.album);
                const currentIndex = albumSongs.findIndex(item => track._id === item._id);
    
                if (currentIndex > 0) {
                    setTrack(albumSongs[currentIndex - 1]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                } else if (isShuffle) {
                    const randomIndex = Math.floor(Math.random() * albumSongs.length);
                    setTrack(albumSongs[randomIndex]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                }
            } else {
                const currentIndex = songsData.findIndex(item => track._id === item._id);
    
                if (currentIndex > 0) {
                    setTrack(songsData[currentIndex - 1]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                } else if (isShuffle) {
                    const randomIndex = Math.floor(Math.random() * songsData.length);
                    setTrack(songsData[randomIndex]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                }
            }
        }
    };    
    
    const next = async () => {
        if (navigationMode === 'album') {
            const albumSongs = songsData.filter(song => song.album === track.album);
            const currentIndex = albumSongs.findIndex(item => track._id === item._id);

            if (currentIndex >= 0) {
                if (currentIndex < albumSongs.length - 1) {
                    setTrack(albumSongs[currentIndex + 1]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                } else if (isShuffle) {
                    const randomIndex = Math.floor(Math.random() * albumSongs.length);
                    setTrack(albumSongs[randomIndex]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                }
            }
        } else {
            const currentIndex = songsData.findIndex(item => track._id === item._id);

            if (currentIndex >= 0) {
                if (currentIndex < songsData.length - 1) {
                    setTrack(songsData[currentIndex + 1]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                } else if (isShuffle) {
                    const randomIndex = Math.floor(Math.random() * songsData.length);
                    setTrack(songsData[randomIndex]);
                    await audioRef.current.play();
                    setPlayStatus(true);
                }
            }
        }
    };

    const seekSong = (e) => {    
        const newTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };
    

    const toggleShuffle = () => {
        setIsShuffle(prev => !prev);
    };

    const toggleRepeat = () => {
        setIsRepeat(prev => !prev);
    };

    const setNavigationToAlbum = () => {
        setNavigationMode('album');
    };

    const setNavigationToAll = () => {
        setNavigationMode('all');
    };

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnd = () => {
            if (isRepeat) {
                play();
            } else {
                next();
            }
        };

        if (audio) {
            audio.volume = volume;
            audio.addEventListener('ended', handleEnd);

            return () => {
                audio.removeEventListener('ended', handleEnd);
            };
        }
    }, [volume, isRepeat, next]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            if (audio) {
                const currentTime = audio.currentTime;
                const duration = audio.duration;

                seekBar.current.style.width = (Math.floor(currentTime / duration * 100)) + '%';

                setTime({
                    currentTime: {
                        second: Math.floor(currentTime % 60),
                        minute: Math.floor(currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60)
                    }
                });
            }
        };

        const handleLoadedMetadata = () => {
            handleTimeUpdate();
        };

        const handleLoadedData = () => {
            if (playStatus) {
                play();
            }
        };

        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('loadeddata', handleLoadedData);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('loadeddata', handleLoadedData);
            };
        }
    }, [track, playStatus]);

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
        } catch (error) {
            console.log(error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData, albumsData,
        volume, setVolume,
        shuffle: toggleShuffle,
        repeat: toggleRepeat,
        isShuffle,
        isRepeat,
        setNavigationToAlbum,
        setNavigationToAll,
        navigationMode,
        isMuted,
        toggleMute
    };    

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;