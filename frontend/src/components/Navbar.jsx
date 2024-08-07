import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

const Navbar = () => {

    const navigate = useNavigate()

  return (
    <>
        <div className="w-full flex justify-between items-center font-semibold">
            <div className="flex items-center gap-2 ">
                <img onClick={() => navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left} alt="" />
                <img onClick={() => navigate(1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right} alt="" />
            </div>
            <div className="flex items-center gap-4">
                <button className="font-[Metropolis] font-bold text-gray-400 mr-5 cursor-pointer hover:text-white hover:scale-105">Sign up</button>
                <button className="font-[Metropolis font-bold bg-white text-black text-[17px] px-8 py-3 rounded-full hidden md:block cursor-pointer hover:bg-gray-200 hover:scale-105">Log in</button>
            </div>
        </div>
    </>
  )
}

export default Navbar