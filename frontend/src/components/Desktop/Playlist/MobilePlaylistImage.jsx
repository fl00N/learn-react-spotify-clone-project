import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";

const MobilePlaylistImage = ({ playlistData }) => {
  const navigate = useNavigate();

  return (
    <div className="max-[340px]:relative">
      <img
        onClick={() => navigate(-1)}
        className="absolute left-[20px] max-[340px]:left-[-60px] max-[320px]:left-[-55px] max-[310px]:left-[-47px] w-8 p-2"
        src={assets.arrow_left}
        alt="Go Back"
      />

      {playlistData.image ? (
        <div>
          <img
            className="w-[190px] h-[190px] rounded object-cover"
            src={playlistData.image}
            alt={playlistData.name}
          />
        </div>
      ) : (
        <div className="bg-[#282828]">
          <div className="w-[190px] h-[190px] flex items-center justify-center relative">
            <img
              className="w-16 rounded"
              src={assets.music_note_icon}
              alt="Edit"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePlaylistImage;
