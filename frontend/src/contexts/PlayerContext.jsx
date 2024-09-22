import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { useLocation } from 'react-router-dom';
import { PlaylistContext } from "./PlaylistContext";
import { config } from "../config";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    
    const location = useLocation();

    const { authState } = useContext(AuthContext)
    const { playlistsData } = useContext(PlaylistContext)

    const [currentId, setCurrentId] = useState(null)
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [navigationMode, setNavigationMode] = useState('album');
    const [isMuted, setIsMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(0.1);
    const [currentPlaylistSongs, setCurrentPlaylistSongs] = useState([]);
    const [currentAlbumSongs, setCurrentAlbumSongs] = useState([]);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });
    
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
            if (audioRef.current) {
                audioRef.current.src = song.file;
                audioRef.current.load();
                
                audioRef.current.addEventListener('canplaythrough', async () => {
                    try {
                        await audioRef.current.play();
                        setPlayStatus(true);
                    } catch (error) {
                        console.error('Error playing audio:', error);
                    }
                }, { once: true });
            }
        }
    };

    useEffect(() => {
        const id = location.pathname.split('/').pop();
        setCurrentId(id);
    }, [location.pathname]);   


    useEffect(() => {
        const currentPlaylist = playlistsData.find(pl => pl._id === currentId);
        if (currentPlaylist) {
            setCurrentPlaylistSongs(currentPlaylist.songs);            
        }
    }, [currentId, playlistsData])
    
    useEffect(() => {
        if (track && track.album) {
            const albumSongs = songsData.filter(song => song.album === track.album);
            setCurrentAlbumSongs(albumSongs);
        }
    }, [currentId, albumsData, songsData, track]);

    const previous = async () => {
        if (track) {
            const songsArray = navigationMode === 'playlist' ? currentPlaylistSongs : currentAlbumSongs;
            const currentIndex = songsArray.findIndex(item => track._id === item._id);
            
            if (currentIndex > 0) {
                setTrack(songsArray[currentIndex - 1]);
            } else if (isShuffle) {
                const randomIndex = Math.floor(Math.random() * songsArray.length);
                setTrack(songsArray[randomIndex]);
            }
        }
    };
    
    const next = async () => {
        if (track) {
            const songsArray = navigationMode === 'playlist' ? currentPlaylistSongs : currentAlbumSongs;
            const currentIndex = songsArray.findIndex(item => track._id === item._id);
            
            if (currentIndex < songsArray.length - 1) {
                setTrack(songsArray[currentIndex + 1]);
            } else if (isShuffle) {
                const randomIndex = Math.floor(Math.random() * songsArray.length);
                setTrack(songsArray[randomIndex]);
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

    const setNavigationToPlaylist = () => {
        setNavigationMode('playlist');
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
            const response = await axios.get(`${config.baseUrl}/api/song/list`);
            setSongsData(response.data.songs);
        } catch (error) {
            console.log(error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/api/album/list`);
            setAlbumsData(response.data.albums);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSongsData()
        getAlbumsData()
    }, []);

    useEffect(() => {
        if (!authState.user) {
            setTrack(null);
        }
    }, [authState.user]);

    const contextValue = {
        audioRef,
        seekBg, seekBar,
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
        setNavigationToAlbum, setNavigationToPlaylist,
        navigationMode,
        isMuted,
        toggleMute,
        currentId
    };    

    return (
        <PlayerContext.Provider value={contextValue}>
                {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;

