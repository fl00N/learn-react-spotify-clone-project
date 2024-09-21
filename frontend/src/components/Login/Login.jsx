import { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [data, setData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.emailOrUsername) tempErrors.emailOrUsername = "Email or username is required.";
    else if (!emailRegex.test(data.emailOrUsername) && data.emailOrUsername.length < 3)
      tempErrors.emailOrUsername = "Invalid email or username.";
    
    if (!data.password || data.password.length < 6) tempErrors.password = "Password must be at least 6 characters.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (validate()) {
        try {
            const response = await axios.post('http://localhost:4000/api/user/login', {
                emailOrUsername: data.emailOrUsername,
                password: data.password,
            });

            if (response.status === 200) {
                await login(response.data.token, response.data.user);
                toast.success('Login successful');
                navigate('/');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
            setErrors({ ...errors, submit: errorMessage });
        }
    }
};

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center bg-[#121212]">
      <img className="w-[40px] mb-6" src={assets.white_spotify_logo} alt="Spotify Logo" />
      <h1 className="text-white font-[Metropolis] font-bold text-[2.4rem] tracking-[-0.02em] text-center">
        Log in to Spotify
      </h1> 

      <form onSubmit={handleLogin} className="mt-6">            
        <div className='flex flex-col'>
          <label className="font-[Metropolis] font-semibold text-white text-[0.9rem] mb-1">Email or username</label>
          <input
            name="emailOrUsername"
            value={data.emailOrUsername}
            onChange={onChangeHandler}
            type="text"
            placeholder="Email or username"
            className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] w-[324px] border-gray-500 rounded text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.emailOrUsername && <p className="text-red-500 font-medium mt-1 text-sm">{errors.emailOrUsername}</p>}
        </div>

        <div className='flex flex-col mt-4'>
          <label className="font-[Metropolis] font-semibold text-white text-[0.9rem] mb-1">Password</label>
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] w-[324px] border-gray-500 rounded text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.password && <p className="text-red-500 font-medium mt-1 text-sm">{errors.password}</p>}
        </div>

        <button
            type="submit"
            className="mt-6 w-[324px] bg-green-500 py-3 rounded-full font-bold"
          >
            Log In
          </button>
      </form>

      <div className='flex flex-col items-center'>
        <hr className="brightness-[30%] w-[21rem] mt-10" />
        <p className='text-[#b3b3b3] font-medium mt-8'>
          Don't have an account?
          <span className='text-white underline ml-1 cursor-pointer hover:text-green-400' onClick={() => navigate('/signup')}>Sign up for Spotify.</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
