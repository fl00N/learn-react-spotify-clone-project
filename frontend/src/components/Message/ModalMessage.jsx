import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

const ModalMessage = ({ image, onClose }) => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
  
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
    <div className="relative">
      <div className="fixed inset-0 bg-black bg-opacity-[80%] flex items-center justify-center z-10 animate-fade-in">
        <div 
          ref={modalRef} 
          className="flex items-center bg-[#282828] rounded-lg shadow-lg py-16 px-[4.7rem] gap-16 animate-slide-in-modal"
        >
          <img className="rounded-lg" src={image} alt="" />
          <div className="flex flex-col items-center">
            <p className="mb-8 text-3xl font-bold">
              Start listening with a <br /> free Spotify account
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="font-[Metropolis] bg-green-500 py-3 px-8 rounded-full font-bold text-black hover:bg-green-400 hover:scale-[1.03] active:scale-100 active:bg-green-600"
            >
              Sign up free
            </button>
            <button
              className="mt-3 py-3 px-8 rounded-full font-bold text-white border-[1px] border-zinc-500 hover:border-white hover:scale-[1.03] active:scale-100 active:brightness-65 active:pointer-events-none"
            >
              Download app
            </button>
            <p className='text-sm text-[#b3b3b3] font-medium mt-8'>
              Already have an account?
              <span
                className='text-white underline ml-1 cursor-pointer hover:text-green-400'
                onClick={() => navigate('/login')}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
            <button
            onClick={onClose}
            className='absolute bottom-24 font-bold text-[#b3b3b3] hover:text-white hover:scale-105 animate-slide-in-modal'
        >
            Close
        </button>
      </div>
    </div>
  );
};

export default ModalMessage;
