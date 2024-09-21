import { createContext, useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {

    const { authState } = useContext(AuthContext)

    const [playlistsData, setPlaylistsData] = useState([]);

    const url = 'http://localhost:4000';

    const getPlaylistsData = async () => { 
        try {
            const userId = authState.user ? authState.user._id : null;
            const isAdmin = authState.user ? !!authState.user.isAdmin : false;

            if (!isAdmin && !userId) {
                setPlaylistsData([]);
                return
            }
            
            const response = await axios.get(`${url}/api/playlist/list`, {
                params: { userId, isAdmin },
            });

            setPlaylistsData(response.data.playlists);
        } catch (error) {
            console.error('Error fetching playlists:', error.response ? error.response.data : error.message);
        }        
    };
    
    const addPlaylist = async (name) => {
        const userId = authState.user ? authState.user._id : null;

        try {
            const response = await axios.post(`${url}/api/playlist/add`, { name, userId });
            if (response.data.success) {
                await getPlaylistsData();
            } else {
                console.error('Error adding playlist:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding playlist:', error.response ? error.response.data.message : error.message);
        }
    };

    const removePlaylist = async (playlistId) => {
        try {
            const response = await axios.post(`${url}/api/playlist/remove`, { playlistId });
            if (response.data.success) {
                await getPlaylistsData();
                toast.success('Playlist removed successfully!');
            } else {
                toast.error('Error removing playlist.');
            }
        } catch (error) {
            toast.error('Error removing playlist.');
            console.error("Error removing playlist:", error);
        }
    };

    const editPlaylist = async (playlistId, updatedName, updatedImage) => {
        try {
            const formData = new FormData();
            formData.append('playlistId', playlistId);
            formData.append('name', updatedName);
            if (updatedImage) formData.append('image', updatedImage);
    
            const response = await axios.post(`${url}/api/playlist/edit`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                await getPlaylistsData();
                toast.success('Playlist updated successfully!');
            }
        } catch (error) {
            toast.error('Error updating playlist.');
            console.error('Error updating playlist:', error);
        }
    };

    const addSongToPlaylist = async (playlistId, songId) => {
        try {
            const response = await axios.post(`${url}/api/playlist/add-song`, {
                playlistId,
                songId,
                userId: authState.user._id
            });

            console.log("API Response:", response.data);
    
            if (response.data.success) {
                await getPlaylistsData();
            } else {
                toast.error('Error adding song to playlist.');
            }
        } catch (error) {
            toast.error('Error adding song to playlist.');
            console.error("Error adding song to playlist:", error);
        }
    };
    
    const removeSongFromPlaylist = async (playlistId, songId) => {
        try {
            const response = await axios.post(`${url}/api/playlist/remove-song`, {
                playlistId,
                songId,
                userId: authState.user._id
            });
    
            if (response.data.success) {
                await getPlaylistsData();
            } else {
                toast.error('Error removing song from playlist.');
            }
        } catch (error) {
            toast.error('Error removing song from playlist.');
            console.error("Error removing song from playlist:", error);
        }
    };

    useEffect(() => {
        if (authState.user) {
            getPlaylistsData();
        } else {
            setPlaylistsData([]);
        }
    }, [authState.user]);

    const contextValue = {
        addPlaylist,
        removePlaylist,
        editPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        playlistsData,
        setPlaylistsData
    }

    return (
        <PlaylistContext.Provider value={contextValue}>
                {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;
