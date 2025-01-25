import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Desktop } from "./Desktop";
import Mobile from "./Mobile";
import Signup from "./components/Other/Signup/Signup";
import Login from "./components/Other/Login/Login";
import { useEffect, useState } from "react";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const DesktopOrMobile = !isMobile ? <Desktop /> : <Mobile />;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={DesktopOrMobile} />
      </Routes>
    </>
  );
};

export default App;
