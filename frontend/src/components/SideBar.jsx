/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const SideBar = () => {
    
    const navigate = useNavigate()

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
        <div className='bg-[#121212] h-[20%] rounded-lg flex flex-col justify-around'>
            <div onClick={() => navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer brightness-65 hover:brightness-100'>
                <img className='w-6' src={assets.home_icon} alt="" />
                <p className='font-bold'>Home</p>
            </div>

            <div className='flex items-center gap-3 pl-8 cursor-pointer brightness-65 hover:brightness-100'>
                <img className='w-6' src={assets.search_icon} alt="" />
                <p className='font-bold'>Search</p>
            </div>
        </div>

        <div className='bg-[#121212] h-[85%] rounded-lg'>
            <div className='p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3 brightness-65 hover:brightness-100 cursor-pointer'>
                    <img className='w-7' src={assets.stack_icon} alt="" />
                    <p className='font-semibold'>Your Library</p>
                </div>
                <div className='flex items-center gap-3'>
                    <img className='w-5 cursor-pointer' src={assets.plus_icon} alt="" />
                </div>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                <h1 className='font-[Metropolis]'>Create your first playlist</h1>
                <p className='font-light'>It's easy, we will help you</p>
                <button className='font-[Metropolis] font-bold px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-200 hover:scale-[1.03]'>Create Playlist</button>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                <h1 className='font-[Metropolis]'>Let's find some podcasts to follow</h1>
                <p className='font-light'>We will keep you on new episodes</p>
                <button className='font-[Metropolis] font-bold px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-200 hover:scale-[1.03]'>Browse Podcasts</button>
            </div>
        </div>
    </div>
  )
}

export default SideBar