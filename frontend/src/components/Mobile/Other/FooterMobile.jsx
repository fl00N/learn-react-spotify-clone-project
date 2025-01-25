import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";

const FooterMobile = () => {
  const navigate = useNavigate();

  const isHomeActive = location.pathname === "/";
  const isSearchActive = location.pathname === "/search";
  const isLibraryActive = location.pathname === "/library";

  return (
    <div className="fixed bottom-0 bg-[#121212] w-full flex justify-between h-[70px] px-2 py-3">
      <div
        onClick={() => navigate("/")}
        className={`flex flex-col items-center gap-0.5 transition w-full ${
          isHomeActive ? "brightness-200" : "brightness-65 hover:brightness-100"
        }`}
      >
        <img className="w-6" src={assets.home_icon} alt="Home Icon" />
        <p className="font-medium text-white text-[11px]">Home</p>
      </div>

      <div
        onClick={() => navigate("/search")}
        className={`flex flex-col items-center gap-0.5 transition w-full ${
          isSearchActive
            ? "brightness-200"
            : "brightness-65 hover:brightness-100"
        }`}
      >
        <img className="w-6" src={assets.search_icon} alt="Search Icon" />
        <p className="font-medium text-white text-[11px]">Search</p>
      </div>

      <div
        onClick={() => navigate("/library")}
        className={`flex flex-col items-center gap-0.5 transition w-full ${
          isLibraryActive
            ? "brightness-200"
            : "brightness-65 hover:brightness-100"
        }`}
      >
        <img className="w-6" src={assets.stack_icon} alt="Search Icon" />
        <p className="font-medium text-white text-[11px]">My Library</p>
      </div>
    </div>
  );
};

export default FooterMobile;
