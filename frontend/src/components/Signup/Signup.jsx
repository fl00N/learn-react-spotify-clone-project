import { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    email: '',
    password: '',
    username: '',
    month: '',
    day: '',
    year: '',
    gender: '',
    shareData: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    hasLetter: false,
    hasNumberOrSpecial: false,
    isLongEnough: false,
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumberOrSpecial = /[\d\W]/.test(password);
    const isLongEnough = password.length >= 10;

    setPasswordValidation({
      hasLetter,
      hasNumberOrSpecial,
      isLongEnough,
    });
  };

  const validateEmail = () => {
    const tempErrors = {};
    if (!data.email) tempErrors.email = 'Email is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validatePasswordStep = () => {
    const tempErrors = {};
    if (!data.password || data.password.length < 6) tempErrors.password = 'Password must be at least 6 characters.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateProfile = () => {
    const tempErrors = {};
    if (!data.username) tempErrors.username = 'Username is required.';
    if (!data.day || !data.month || !data.year) tempErrors.dob = 'Date of birth is required.';
    if (!data.gender) tempErrors.gender = 'Gender is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = async (event) => {
    event.preventDefault();
    if (step === 1) {
      if (validateEmail()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validatePasswordStep()) {
        setStep(3);
      }
    } else if (step === 3) {
      if (validateProfile()) {
        try {
          const response = await axios.post('http://localhost:4000/api/user/signup', {
            email: data.email,
            password: data.password,
            username: data.username
          });

          if (response.status === 201) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', data.username);
            toast.success('Signup successful');
            navigate('/');
          }
        } catch (error) {
          toast.error('Error');
          setErrors({ ...errors, submit: error.response?.data?.message || 'An error occurred' });
        }
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } 
  };

  const getProgressBarWidth = () => {
    const stepPercent = ((step - 1) / 2) * 100;
    return `${stepPercent}%`;
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center bg-[#121212]">
      <img className="w-[40px] mb-6" src={assets.white_spotify_logo} alt="Spotify Logo" />
      <div className="w-full max-w-md">
        <div className="mb-4">
          {step === 1 && (
            <h1 className="text-white font-[Metropolis] font-bold text-5xl tracking-[-0.055em] text-center">
              Sign up to start <br /> listening
            </h1>  
          )}
          {step > 1 && (
            <div className="relative w-full h-[2px] bg-[#b3b3b38e] rounded-full overflow-hidden mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 rounded-full"
                style={{ width: getProgressBarWidth() }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center mb-10 ml-6">
          {step > 1 && (
            <img className='w-5 cursor-pointer' src={assets.arrow_left} onClick={handleBack} />
          )}

          {step > 1 && (
            <div className="flex-1 flex-col text-white font-semibold font-[Metropolis] ml-4">
              <p className='text-[#b3b3b3]'>Step {step - 1} of 2</p>
              <div>
                {step === 2 && 'Create a password'}
                {step === 3 && 'Complete your profile'}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleNext} className='flex flex-col items-center'>
          {step === 1 && (
            <div>            
              <div className='flex flex-col'>
                <label className="font-[Metropolis] font-semibold text-white text-[0.9rem] mb-1">Email address</label>
                <input
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  type="email"
                  placeholder="name@domain.com"
                  className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] w-[324px] border-gray-500 rounded text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
                />
                {errors.email && <p className="text-red-500 font-medium mt-1 text-sm">{errors.email}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className='flex flex-col'>
                <label className="font-[Metropolis] font-semibold text-white text-[0.9rem] mb-1">Password</label>
                <input
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                  type="password"
                  placeholder="Password"
                  className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] border-gray-500 rounded w-full text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
                />
                {errors.password && <p className="text-red-500 font-medium mt-1 text-sm">{errors.password}</p>}
                <div className="mt-4 text-white mb-3">
                  <p className='font-semibold mb-1.5'>Your password must contain at least</p>

                  <div className="flex items-center">
                    {passwordValidation.hasLetter ? (
                      <img className='w-3.5 mr-1' src={assets.tick_icon} alt="" />
                    ) : (
                      <span className="text-red-500 mr-2">✘</span>
                    )}
                    <span>1 letter</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {passwordValidation.hasNumberOrSpecial ? (
                      <img className='w-3.5 mr-1' src={assets.tick_icon} alt="" />
                    ) : (
                      <span className="text-red-500 mr-2">✘</span>
                    )}
                    <span>1 number or special character (e.g., # ? ! &)</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {passwordValidation.isLongEnough ? (
                      <img className='w-3.5 mr-1' src={assets.tick_icon} alt="" />
                    ) : (
                      <span className="text-red-500 mr-2">✘</span>
                    )}
                    <span>10 characters</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className='flex flex-col'>
                <label className="font-[Metropolis] font-semibold text-white text-[0.9rem] mb-1">Username</label>
                <input
                  name="username"
                  value={data.username}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="Username"
                  className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] border-gray-500 rounded text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
                />
                {errors.username && <p className="text-red-500 font-medium mt-1 text-sm">{errors.username}</p>}
              </div>
              <div className='flex flex-col mt-3'>
                <label className="font-[Metropolis] font-semibold text-white text-[0.9rem] mb-1">Date of Birth</label>
                <div className="flex gap-2">
                  <input
                    name="day"
                    value={data.day}
                    onChange={onChangeHandler}
                    type="number"
                    placeholder="Day"
                    className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] w-[100px] border-gray-500 rounded text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    name="month"
                    value={data.month}
                    onChange={onChangeHandler}
                    type="number"
                    placeholder="Month"
                    className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] w-[100px] border-gray-500 rounded text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    name="year"
                    value={data.year}
                    onChange={onChangeHandler}
                    type="number"
                    placeholder="Year"
                    className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] w-[100px] border-gray-500 rounded text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                {errors.dob && <p className="text-red-500 font-medium mt-1 text-sm">{errors.dob}</p>}
              </div>
              <div className='flex flex-col mt-3 mb-3'>
                <label className="font-[Metropolis] font-semibold text-white text-[0.9rem] mb-1">Gender</label>
                <select
                  name="gender"
                  value={data.gender}
                  onChange={onChangeHandler}
                  className="bg-[#121212] border-solid border-[1px] px-3.5 py-[0.7rem] border-gray-500 rounded w-full text-white placeholder:text-[#a3a3a3] placeholder:font-medium placeholder:text-[0.95rem] hover:outline hover:outline-[1.5px] focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Watermelon</option>
                </select>
                {errors.gender && <p className="text-red-500 font-medium mt-1 text-sm">{errors.gender}</p>}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-5 w-[324px] bg-green-500 py-3 rounded-full font-bold"
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </form>

        {step === 1 && (
          <div className='flex flex-col items-center'>
            <hr className="brightness-[30%] w-[21rem] mt-10" />
            <p className='text-[#b3b3b3] font-medium mt-8'>
              Already have an account?
              <span className='text-white underline ml-1 cursor-pointer hover:text-green-400' onClick={() => navigate('/login')}>Log in here.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
