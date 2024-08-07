import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw]">
        <img className='mt-5 hidden sm:block' style={{ width: 'max(10vw, 100px)' }} src={assets.logo} alt="" />
        <img className='mt-5 mr-5 sm:hidden block' style={{ width: 'max(5vw, 40px)' }} src={assets.logo_small} alt="" />

        <div className='flex flex-col gap-5 mt-10'>
            <NavLink to='/add-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium' style={{paddingRight: 'max(8vw, 10px)'}}>
                <img className='w-5' src={assets.add_song} alt="" />
                <p className='hidden sm:block'>Add Song</p>
            </NavLink>

            <NavLink to='/list-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium' style={{paddingRight: 'max(8vw, 10px)'}}>
                <img className='w-5' src={assets.song_icon} alt="" />
                <p className='hidden sm:block'>List of Songs</p>
            </NavLink>

            <NavLink to='/add-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium' style={{paddingRight: 'max(8vw, 10px)'}}>
                <img className='w-5' src={assets.add_album} alt="" />
                <p className='hidden sm:block'>Add Album</p>
            </NavLink>

            <NavLink to='list-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium' style={{paddingRight: 'max(8vw, 10px)'}}>
                <img className='w-5' src={assets.album_icon} alt="" />
                <p className='hidden sm:block'>List of Albums</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar