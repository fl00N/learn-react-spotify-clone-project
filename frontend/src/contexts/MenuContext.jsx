// contexts/ContextMenuContext.js
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { PlaylistContext } from './PlaylistContext';
import { useEditModal } from './EditModalContext';

const MenuContext = createContext();

export const ContextMenuProvider = ({ children }) => {
    const menuRef = useRef(null);
    
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        playlistData: null
    });

    const { openEditModal } = useEditModal(); 
    const { removePlaylist } = useContext(PlaylistContext);

    const showMenu = (x, y, playlistData) => {
        setContextMenu({
            visible: true,
            x,
            y,
            playlistData
        });
    };

    const hideMenu = () => {
        setContextMenu({
            ...contextMenu,
            visible: false,
        });
    };

    const handleEdit = () => {
        if (contextMenu.playlistData) {
            openEditModal(contextMenu.playlistData)
            hideMenu();
        }
    };

    const handleDelete = () => {
        if (contextMenu.playlistData) {
            removePlaylist(contextMenu.playlistData._id);
            hideMenu();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                hideMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuRef]);

    return (
        <MenuContext.Provider value={{ contextMenu, showMenu, hideMenu }}>
            {children}

            {contextMenu.visible && (
                <div
                    ref={menuRef}
                    className="absolute"
                    style={{
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                    }}
                    onClick={hideMenu}
                >
                    <ul className="w-[200px] bg-[#282828] rounded shadow-lg p-2">
                        <li 
                            onClick={handleEdit}
                            className="flex items-center font-medium py-2 px-2 text-[#ffffffe6] cursor-pointer hover:bg-[#ffffff23]"
                        >
                            <img className='w-4 mr-4 brightness-75' src={assets.pencil_icon} alt="" />
                            Edit Details
                        </li>
                        <li
                            onClick={handleDelete} 
                            className="flex items-center font-medium py-2 px-2 text-[#ffffffe6] cursor-pointer hover:bg-[#ffffff23]"
                        >
                            <img className='w-4 mr-4 brightness-75' src={assets.minus_icon} alt="" />
                            Delete
                        </li>
                    </ul>
                </div>
            )}
        </MenuContext.Provider>
    );
};

export const useContextMenu = () => useContext(MenuContext);
