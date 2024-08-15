import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { authState, logout } = useContext(AuthContext);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const isSearch = location.pathname === '/search';

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchTerm}`);
    };

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        console.log('AuthState updated:', authState);
    }, [authState]);

    return (
        <div className="w-full flex justify-between items-center font-semibold">
            <div className="flex items-center gap-2">
                <img 
                    onClick={() => navigate(-1)} 
                    className="w-8 bg-black p-2 rounded-2xl cursor-pointer" 
                    src={assets.arrow_left} 
                    alt="Go Back" 
                />
                <img 
                    onClick={() => navigate(1)} 
                    className="w-8 bg-black p-2 rounded-2xl cursor-pointer" 
                    src={assets.arrow_right} 
                    alt="Go Forward" 
                />

                {isSearch && (
                    <form onSubmit={handleSearch} role="search" className="flex items-center brightness-75 hover:brightness-100">
                        <img
                            className="absolute left-4 top-1/2 w-[18px] transform -translate-y-1/2 z-10"
                            src={assets.search_icon} 
                            alt="Search Icon" 
                        />
                        <input 
                            className="bg-[#303030] rounded-full py-3 pl-12 w-[22.5rem] placeholder:text-[#b3b3b310e] placeholder:font-[Metropolis] placeholder:text-sm placeholder:font-medium outline-white focus:outline focus:outline-[3px]" 
                            type="text" 
                            placeholder="What do you want to play?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        /> 
                    </form>
                )}
            </div>
            <div className="flex items-center gap-4">
                {!authState.token ? (
                    <>
                        <button 
                            onClick={() => navigate('/signup')} 
                            className="font-[Metropolis] font-bold text-gray-400 mr-5 cursor-pointer hover:text-white hover:scale-105 active:text-gray-500 active:scale-100"
                        >
                            Sign up
                        </button>
                        <button 
                            onClick={() => navigate('/login')} 
                            className="font-[Metropolis] font-bold bg-white text-black text-[17px] px-8 py-3 rounded-full hidden md:block cursor-pointer hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100"
                        >
                            Log in
                        </button>
                    </>
                ) : (
                    <div className="flex items-center">
                        <div onClick={toggleDropdown} className="w-8 h-8 text-[0.85rem] bg-[#19E68C] rounded-full flex items-center justify-center text-black font-bold cursor-pointer">
                            {authState.user ? authState.user.username[0].toUpperCase() : 'U'}
                        </div>
                        {isOpen && (
                            <div className='absolute top-[4.5rem] right-[3rem] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]'>
                                <ul className='py-1 px-1'>
                                    <li className='flex items-center px-3 py-2 hover:bg-[#ffffff23] rounded cursor-pointer'>
                                        <button 
                                            onClick={handleLogout} 
                                            className="font-[Metropolis] font-semibold text-[#ffffffe6] text-sm cursor-pointer active:text-gray-500 active:scale-100"
                                        >
                                            Log out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
