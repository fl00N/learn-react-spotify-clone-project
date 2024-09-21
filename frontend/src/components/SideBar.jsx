import { useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useState } from 'react';
import LoginMessage from './Message/LoginMessage';
import { AuthContext } from '../contexts/AuthContext';
import PrivatePlaylistItem from './Playlist/PrivatePlaylistItem'
import { PlaylistContext } from '../contexts/PlaylistContext';

const SideBar = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const { authState } = useContext(AuthContext);
    const { playlistsData, addPlaylist } = useContext(PlaylistContext);

    const [isOpen, setOpen] = useState(false);
    const [isMessageOpen, setMessageOpen] = useState(false);

    const handleModalClick = () => {
        setMessageOpen(true);
    };

    const handleCreatePlaylistClick = async () => {
        try {
            await addPlaylist(authState.userId);
        } catch (error) {
            console.error('Error adding playlist:', error);
        }
        setOpen(false)
    };

    const toggleDropdown = () => {
        setOpen(prev => !prev);
    };

    const isHomeActive = location.pathname === '/';
    const isSearchActive = location.pathname === '/search';

    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-[20%] rounded-lg flex flex-col justify-around">
                <div onClick={() => navigate('/')} className={`flex items-center gap-5 pl-6 cursor-pointer transition ${isHomeActive ? 'brightness-200' : 'brightness-65 hover:brightness-100'}`}>
                    <img className="w-6" src={assets.home_icon} alt="Home Icon" />
                    <p className="font-bold">Home</p>
                </div>

                <div onClick={() => navigate('/search')} className={`flex items-center gap-5 pl-6 cursor-pointer transition ${isSearchActive ? 'brightness-200' : 'brightness-65 hover:brightness-100'}`}>
                    <img className="w-6" src={assets.search_icon} alt="Search Icon" />
                    <p className="font-bold">Search</p>
                </div>
            </div>

            <div className="bg-[#121212] h-[80%] rounded-lg">
                <div className="pt-4 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 pl-6 brightness-65 hover:brightness-100 cursor-pointer transition">
                        <img className="w-6" src={assets.stack_icon} alt="Library Icon" />
                        <p className="font-semibold">Your Library</p>
                    </div>
                    <div className="relative">
                        <div className="flex items-center gap-3 pr-6">
                            <img 
                                className="w-4 cursor-pointer" 
                                src={assets.plus_icon} 
                                alt="Toggle dropdown" 
                                onClick={toggleDropdown}
                            />
                        </div>
                        {isOpen && (
                            <div className="absolute right-4 mt-2 w-[12.5rem] bg-[#282828] rounded shadow-lg z-50">
                                <ul className="py-1.5 px-1">
                                    <li 
                                        className="flex items-center py-2 px-2 hover:bg-[#ffffff23] cursor-pointer" 
                                        onClick={authState.token
                                            ? () => handleCreatePlaylistClick() 
                                            : () => {
                                                handleModalClick();
                                                setOpen(false);
                                            }}
                                    >
                                        <img className="w-6" src={assets.note_icon} alt="Create Playlist Icon" />
                                        <p className="font-medium text-sm text-[#ffffffE6] px-2">Create a new playlist</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='max-h-[27rem] overflow-auto overflow-x-hidden'>
                    {playlistsData.length === 0 && (
                        <div>
                            <div className="p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                                <h1 className="font-[Metropolis] text-[#b3b3b3]">Create your first playlist</h1>
                                <p className="font-[Metropolis] text-[#b3b3b3] font-medium text-[14px]">It's easy, we will help you</p>
                                <button 
                                    onClick={authState.token
                                        ? () => handleCreatePlaylistClick() 
                                        : () => {
                                            handleModalClick();
                                            setOpen(false);
                                    }}                                    
                                    className="font-[Metropolis] font-bold px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100"
                                >
                                    Create Playlist
                                </button>
                                {isMessageOpen && (
                                    <LoginMessage 
                                        isOpen={isMessageOpen} 
                                        onClose={() => setMessageOpen(false)} 
                                    />
                                )}
                            </div>
                            <div className="p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                                <h1 className="font-[Metropolis] text-[#b3b3b3]">Let's find some podcasts to follow</h1>
                                <p className="font-[Metropolis] text-[#b3b3b3] font-medium text-[14px]">We will keep you on new episodes</p>
                                <button className="font-[Metropolis] font-bold px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100">Browse Podcasts</button>
                            </div>
                        </div>
                    )}
                        {playlistsData.map((item) => (
                            <PrivatePlaylistItem
                                key={item._id}
                                name={item.name}
                                id={item._id}
                                image={item.image}
                            />
                        ))}
                </div>

            </div>
        </div>
    );
};

export default SideBar;
