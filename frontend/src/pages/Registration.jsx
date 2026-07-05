import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { ThemeContext } from '../context/ThemeContext';

function Registration() {
    let [show, setShow] = useState(false)
    let { serverUrl } = useContext(authDataContext)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { getCurrentUser } = useContext(userDataContext)
    let [loading, setLoading] = useState(false)
    const { theme } = useContext(ThemeContext)

    let navigate = useNavigate()

    const handleSignup = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(serverUrl + '/api/auth/registration',{
                name, email, password
            },{withCredentials:true})
            if (result.data && result.data.token) {
                localStorage.setItem("onecart_token", result.data.token)
            }
            getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "User Registration Failed")
            setLoading(false)
        }
    }

    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth , provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googlelogin" ,{name , email} , {withCredentials:true})
            if (result.data && result.data.token) {
                localStorage.setItem("onecart_token", result.data.token)
            }
            getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message || "User Registration Failed")
        }
    }
  
    return (
        <div className={`w-full min-h-screen relative flex items-center justify-center overflow-hidden py-12 ${
            theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
        }`}>
            {/* Glass Signup Card */}
            <div className='max-w-[460px] w-[90%] p-8 rounded-2xl glass-panel z-10 shadow-2xl transition-all duration-300 flex flex-col gap-6 items-center'>
                
                {/* Brand Logo and Title */}
                <div className='flex flex-col items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                    <img className='w-12 h-12 object-contain' src={Logo} alt="Logo" />
                    <h1 className='text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent'>Solivana</h1>
                </div>

                {/* Welcome Message */}
                <div className='text-center flex flex-col gap-1 w-full border-b border-slate-200/10 pb-4'>
                    <h2 className='text-xl font-bold tracking-tight'>Create an Account</h2>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Welcome to Solivana! Register to start ordering.
                    </p>
                </div>

                <form onSubmit={handleSignup} className='w-full flex flex-col gap-5'>
                    {/* Google Registration button */}
                    <div 
                        className={`w-full h-11 rounded-xl flex items-center justify-center gap-3 border font-semibold text-sm transition-all duration-200 cursor-pointer ${
                            theme === 'dark' 
                                ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-white' 
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800 shadow-sm'
                        }`} 
                        onClick={googleSignup}
                    >
                        <img src={google} alt="Google" className='w-5 h-5 object-contain'/> 
                        Register with Google
                    </div>

                    {/* Divider */}
                    <div className='w-full flex items-center justify-center gap-4 text-[10px] font-semibold text-slate-400'>
                        <div className={`flex-1 h-[1px] ${theme === 'dark' ? 'bg-slate-800/20' : 'bg-slate-200'}`}></div> 
                        OR 
                        <div className={`flex-1 h-[1px] ${theme === 'dark' ? 'bg-slate-800/20' : 'bg-slate-200'}`}></div>
                    </div>

                    {/* Input Fields */}
                    <div className='w-full flex flex-col gap-4 relative'>
                        <div className="relative">
                            <input 
                                type="text" 
                                className={`w-full h-11 rounded-xl border px-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    theme === 'dark' 
                                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-500' 
                                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                                }`} 
                                placeholder='User Name' 
                                required  
                                onChange={(e) => setName(e.target.value)} 
                                value={name}
                            />
                        </div>

                        <div className="relative">
                            <input 
                                type="email" 
                                className={`w-full h-11 rounded-xl border px-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    theme === 'dark' 
                                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-500' 
                                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                                }`} 
                                placeholder='Email Address' 
                                required  
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                            />
                        </div>

                        <div className="relative">
                            <input 
                                type={show ? "text" : "password"} 
                                className={`w-full h-11 rounded-xl border px-4 pr-12 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    theme === 'dark' 
                                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-500' 
                                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                                }`} 
                                placeholder='Password' 
                                required 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                {!show ? (
                                    <IoEyeOutline 
                                        className='w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors' 
                                        onClick={() => setShow(prev => !prev)}
                                    />
                                ) : (
                                    <IoEye 
                                        className='w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors' 
                                        onClick={() => setShow(prev => !prev)}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className='w-full h-11 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/10 cursor-pointer disabled:opacity-85'
                        >
                            {loading ? <Loading /> : "Create Account"}
                        </button>

                        <p className={`text-xs text-center mt-2 ${theme === 'dark' ? 'text-slate-450' : 'text-slate-500'}`}>
                            Already have an account?{" "}
                            <span 
                                className="text-indigo-500 hover:text-indigo-400 font-bold cursor-pointer transition-colors" 
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration
