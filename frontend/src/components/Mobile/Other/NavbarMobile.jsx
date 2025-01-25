import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const NavbarMobile = () => {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  const isAllActive = location.pathname === "/";

  return (
    <div>
      <div className="px-4 pt-4 pb-2 flex gap-3">
        <div className="w-7 h-7 text-[0.80rem] bg-[#17c67a] rounded-full flex items-center justify-center text-black font-bold cursor-pointer">
          {authState.user ? authState.user.username[0].toUpperCase() : "U"}
        </div>

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
    </div>
  );
};

export default NavbarMobile;
