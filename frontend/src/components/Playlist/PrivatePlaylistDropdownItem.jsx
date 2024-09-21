/* eslint-disable react/prop-types */
import { assets } from "../../assets/assets";

const PrivatePlaylistDropdownItem = ({ id, image, name, isSelected, onToggleSelect }) => {

    const handleSelect = () => {
        onToggleSelect(id);
    };

    return (
        <div
            onClick={handleSelect}
            className="relative min-w-[220px] p-2 mr-2 ml-2 flex items-center justify-between rounded"
        >
            <div className="flex items-center">
                {image 
                ? <img className="w-8 h-8 rounded object-cover" src={image} alt={name} />
                : <div className="rounded w-8 h-8 flex items-center justify-center bg-[#282828]">
                    <img className="w-3.5 brightness-65" src={assets.music_note_icon} alt="" />
                    </div>
                }
                
                <div className="ml-3">
                    <p className="font-semibold text-sm">{name}</p>         
                </div>
            </div>

            {isSelected ? (
                        <img className="w-[17px] brightness-150" src={assets.black_tick_icon} alt="selected" />
                ) : (
                    <img className="w-[17px]" src={assets.circle_icon} alt="" />
                )
            }
        </div>
    );
};

export default PrivatePlaylistDropdownItem;