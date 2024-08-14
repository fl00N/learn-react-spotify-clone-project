import { useEffect, useRef } from "react";

const LoginMessage = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    const handleCloseModal = () => {
        onClose();
    };

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed left-[24rem] top-[12rem] flex items-center justify-center z-[1]">
            <div ref={modalRef} className="bg-[#0074e0] p-4 w-[22rem] rounded-lg shadow-2xl animate-slide-in">
                <div className="absolute left-[-8px] top-[4.25rem] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-[#0074e0]"></div>
                <h2 className="font-[Metropolis] font-bold text-base mb-2">Create a playlist</h2>
                <p className="font-[Metropolis] font-medium text-[0.86rem] mb-4">Log in to create and share playlists.</p>
                <div className="flex justify-end">
                    <button 
                        className="bg-transparent text-[#b3b3b3] text-sm font-bold py-2 px-4 rounded hover:text-[#ffffffE6] hover:scale-105 active:scale-100 active:text-[#b3b3b38e]"
                        onClick={handleCloseModal}
                    >
                        Not now
                    </button>
                    <button 
                        className="bg-white text-black font-bold text-[0.85rem] h-8 px-4 rounded-full hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginMessage;
