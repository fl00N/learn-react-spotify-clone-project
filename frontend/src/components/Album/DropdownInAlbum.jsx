import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../contexts/AuthContext";
import { PlaylistContext } from "../../contexts/PlaylistContext";

const DropdownInAlbum = ({ handleMessageClick, setOpen }) => {

    const { authState } = useContext(AuthContext)
    const { addPlaylist } = useContext(PlaylistContext)

    const [hoveredItem, setHoveredItem] = useState(null);

    const handleCreatePlaylistClick = async () => {
        try {
            await addPlaylist(authState.userId);
        } catch (error) {
            console.error('Error adding playlist:', error);
        }
        setOpen(false)
    };

  return (
    <div className='absolute left-[-0.5rem] mt-4 w-[12.5rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
        <ul className='py-2 px-1'>
            <li className='flex items-center px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'>
                <img className="w-4 brightness-75" src={assets.plus_border_icon} alt="" />
                <p className="font-medium text-sm text-[#ffffffE6] px-2.5">Add to Your Library</p>
            </li>

            <li 
                className='flex items-center justify-between px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'
                onMouseEnter={() => setHoveredItem('playlist')}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <div className="flex items-center">
                    <img className="w-4 brightness-75" src={assets.plus_icon} alt="" />
                    <p className="font-medium text-sm text-[#ffffffE6] px-2.5">Add to Playlist</p>
                </div>
                <img className="w-3" src={assets.arrow_filled_icon} alt="" />

                {hoveredItem === 'playlist' && (
                    <div className='absolute left-[12rem] top-10 w-[16rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
                        <ul className='py-2 px-2'>
                        <div className="flex items-center relative">
                                <input 
                                    type="text" 
                                    placeholder="Find a playlist"
                                    className='w-full pl-10 py-2 bg-[#383838] text-sm text-white rounded font-semibold focus:outline-none placeholder-gray-400'
                                />            
                                <img
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4"
                                    src={assets.search_icon} 
                                    alt="Search Icon" 
                                />
                        </div>
                            <li className='flex items-center mt-1 px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'>
                                <img className="w-4" src={assets.plus_icon} alt="" />
                                <p 
                                    className="font-semibold text-sm text-[#ffffffE6] px-3"
                                    onClick={authState.token
                                        ? () => handleCreatePlaylistClick() 
                                        : () => {
                                            handleMessageClick();
                                            setOpen(false);
                                    }}
                                >
                                    Create playlist
                                </p>
                            </li>
                        </ul>
                    </div>
                )}
            </li>

            <li 
                className='flex items-center justify-between px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'
                onMouseEnter={() => setHoveredItem('share')}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <div className="flex items-center">
                    <img className="w-4 brightness-75" src={assets.share_icon} alt="" />
                    <p className="font-medium text-sm text-[#ffffffE6] px-2.5">Share</p>
                </div>
                <img className="w-3" src={assets.arrow_filled_icon} alt="" />

                {hoveredItem === 'share' && (
                    <div className='absolute left-[12.2rem] top-20 w-[11rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
                        <ul className='py-2 px-1'>
                            <li className='flex items-center justify-between px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'>
                                <img className="w-4" src={assets.copy_icon} alt="" />
                                <p className="font-semibold text-sm text-[#ffffffE6] px-2">Copy Album Link</p>
                            </li>
                        </ul>
                    </div>
                )}
            </li>
        </ul>
    </div>
  )
}

export default DropdownInAlbum