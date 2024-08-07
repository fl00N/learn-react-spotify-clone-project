import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import SideBar from "./components/SideBar"
import { PlayerContext } from "./context/PlayerContext"

const App = () => {

  const {audioRef, track, songsData} = useContext(PlayerContext)
  
  return (
    <div className="h-screen bg-black">
      {
        songsData.length !== 0 
        ? <>
              <div className="h-[90%] flex">
                <SideBar />
                <Display />
              </div>
              <Player />
        </> : null
      }
      <audio ref={audioRef} src={track ? track.file : ''} preload="auto"></audio>
    </div>
  )
}

export default App