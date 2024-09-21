import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { PlaylistContext } from "../contexts/PlaylistContext";

const EditModal = ({ playlistData, onClose }) => {
  
    const [isHovered, setIsHovered] = useState(false);
    const [name, setName] = useState(playlistData.name || "");
    const [preview, setPreview] = useState(playlistData.image || "");
    const [file, setFile] = useState(null);

    const { editPlaylist } = useContext(PlaylistContext);

    const modalRef = useRef(null);
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSave = async () => {
      if (playlistData._id) {
          await editPlaylist(playlistData._id, name, file);
          onClose();
      }
  };  
  
    useEffect(() => {
        setName(playlistData.name || "");
        setPreview(playlistData.image || "");
    }, [playlistData]);

    useEffect(() => {
      const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
              onClose();
            }
          };
          
          document.addEventListener('mousedown', handleClickOutside);
          
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
  }, [onClose]);

  return (
    <div className="z-[9999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="relative bg-[#282828] p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-[30px] text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Edit Details</h2>
        <div className="mb-4">
            <input
              value={name}
              onChange={handleNameChange}
              type="text"
              className="text-white mt-1 block w-full px-3 py-2 bg-[#ffffff1a] focus:outline focus:outline-[#ffffff3a] focus:bg-[#282828] rounded-md shadow-sm sm:text-sm transition-[background]"
              placeholder={playlistData.name}
            />
        </div>
        <div className="mb-4 flex justify-center">
          <label className="w-36 flex">
            {preview 
            ? (
                <div
                  className="w-36 h-36 flex items-center justify-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? (
                        <div className="flex items-center justify-center relative">
                          <img className="w-36 h-36 rounded object-cover brightness-[.35]" src={preview} alt={name} />

                          <img
                              className="w-12 rounded absolute"
                              src={assets.pencil_icon} 
                              alt='Edit'
                          />
                          <p className="text-white absolute bottom-6 text-sm font-semibold">Choose a photo</p>
                        </div>
                    ) : (
                        <img className="w-36 h-36 rounded object-cover" src={preview} alt={name} />
                        )
                    }
                </div>
            )
            : playlistData.image ? (
                        <div
                            className="w-36 h-36 flex items-center justify-center"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? (
                              <div className="flex items-center justify-center relative">
                                <img
                                    className="w-36 rounded brightness-[.30]"
                                    src={playlistData.image} 
                                    alt={playlistData.name}
                                />
                                <img
                                    className="w-12 rounded absolute"
                                    src={assets.pencil_icon} 
                                    alt='Edit'
                                />
                                <p className="text-white absolute bottom-6 text-sm font-semibold">Choose a photo</p>
                              </div>
                            ) : (
                                  <img 
                                      className="w-36 rounded"
                                      src={playlistData.image} 
                                      alt={playlistData.name}
                                  />
                                )
                            }
                        </div>          
            ) : (
              <div
                  className="relative w-36 h-36 flex items-center justify-center bg-[#282828] shadow-[0px_20px_60px_20px_rgba(0,0,0,0.3)]"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
              >
                <img
                    className="w-12 rounded"
                    src={isHovered ? assets.pencil_icon : assets.music_note_icon} 
                    alt='Edit'
                />
                {isHovered && <p className="text-white absolute bottom-6 text-sm font-semibold">Choose a photo</p>}
              </div>
              )
          }
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="hidden mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </label>

        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="font-[Metropolis] font-bold bg-white text-black text-[17px] px-8 py-3 rounded-full hidden md:block cursor-pointer hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
