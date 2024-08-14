import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const isSearch = location.pathname === '/search';

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchTerm}`);
    };

    return (
        <div className="w-full flex justify-between items-center font-semibold">
            <div className="flex items-center gap-2">
                <img onClick={() => navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left} alt="" />
                <img onClick={() => navigate(1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right} alt="" />

                {isSearch && (
                    <form onSubmit={handleSearch} role="search" className="relative flex items-center brightness-75 hover:brightness-100">
                        <img
                            className="absolute left-4 top-1/2 w-[18px] transform -translate-y-1/2 z-10"
                            src={assets.search_icon} 
                            alt="Search Icon" 
                        />
                        <input 
                            className="bg-[#303030] rounded-full h-12 pl-12 w-[22.5rem] placeholder:text-[#b3b3b310e] placeholder:font-[Metropolis] placeholder:text-sm placeholder:font-medium outline-white focus:outline focus:outline-[3px]" 
                            type="text" 
                            placeholder="What do you want to play?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        /> 
                    </form>
                )}
            </div>
            <div className="flex items-center gap-4">
                <button className="font-[Metropolis] font-bold text-gray-400 mr-5 cursor-pointer hover:text-white hover:scale-105 active:text-gray-500 active:scale-100">Sign up</button>
                <button className="font-[Metropolis] font-bold bg-white text-black text-[17px] px-8 py-3 rounded-full hidden md:block cursor-pointer hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100">Log in</button>
            </div>
        </div>
    );
}

export default Navbar;
