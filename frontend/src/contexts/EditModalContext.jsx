import { createContext, useContext, useState } from 'react';
import EditModal from '../components/EditModal';

const EditModalContext = createContext();

export const EditModalProvider = ({ children }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistData, setPlaylistData] = useState(null);

    const openEditModal = (data) => {
        setPlaylistData(data);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
    };

    return (
        <EditModalContext.Provider value={{openEditModal, closeEditModal}}>
            {children}
            {isModalOpen && <EditModal playlistData={playlistData} onClose={closeEditModal} />}
        </EditModalContext.Provider>
    );
};

export const useEditModal = () => useContext(EditModalContext);
