import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarMobile = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isAllActive = location.pathname === "/";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="px-4 pt-4 pb-2 flex gap-3">
        {!authState.token ? (
          <div className="flex justify-end w-full">
            <button
              onClick={() => navigate("/signup")}
              className="font-[Metropolis] font-bold text-gray-400 mr-5 cursor-pointer hover:text-white hover:scale-105 active:text-gray-500 active:scale-100"
            >
              Sign up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-[Metropolis] font-bold bg-white text-black text-[17px] px-4 py-2 rounded-full block cursor-pointer hover:bg-gray-200 hover:scale-[1.03] active:bg-gray-400 active:scale-100"
            >
              Log in
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <div
              onClick={toggleDropdown}
              className="relative w-7 h-7 text-[0.80rem] bg-[#17c67a] rounded-full flex items-center justify-center text-black font-bold cursor-pointer"
            >
              {authState.user ? authState.user.username[0].toUpperCase() : "U"}
            </div>
            {isOpen && (
              <div className="absolute top-[55px] bg-[#282828] rounded shadow-[0_16px_24px_rgba(0,0,0,0.2)] z-[1]">
                <ul className="py-1 px-1">
                  <li className="flex items-center px-2 py-1 hover:bg-[#ffffff23] rounded cursor-pointer">
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

            <div className="flex justify-center gap-2">
              <button
                className={`font-[Metropolis] font-bold text-[12px] px-4 rounded-full active:bg-neutral-900 ${
                  isAllActive
                    ? "bg-[#17c67a] text-black"
                    : "bg-[#1f1f1f] text-neutral-400"
                }`}
              >
                All
              </button>
              <button className="font-[Metropolis] font-bold bg-[#1f1f1f] text-neutral-400 text-[12px] px-4 rounded-full active:bg-neutral-900">
                Music
              </button>
              <button className="font-[Metropolis] font-bold bg-[#1f1f1f] text-neutral-400 text-[12px] px-4 rounded-full active:bg-neutral-900">
                Podcasts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;
