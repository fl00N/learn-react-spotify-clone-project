import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import SideBar from "./components/SideBar"
import { PlayerContext } from "./contexts/PlayerContext"
import { Route, Routes, useLocation } from "react-router-dom"
import Signup from "./components/Signup/Signup"
import Login from "./components/Login/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {audioRef, track, songsData} = useContext(PlayerContext)
  const location = useLocation();

  const noLayoutPaths = ["/signup", "/login"];
  
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!noLayoutPaths.includes(location.pathname) && (
        <div className="h-screen bg-black">
          {songsData.length !== 0 && (
            <>
              <div className="h-[90%] flex">
                <SideBar />
                <Display />
              </div>
              <Player />
            </>
          )}
          <audio
            ref={audioRef}
            src={track ? track.file : ""}
            preload="auto"
          ></audio>
        </div>
      )}
    </>
  )
}

export default App