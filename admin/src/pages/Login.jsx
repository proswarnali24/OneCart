import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';
import { ThemeContext } from '../context/ThemeContext';

function Login() {
    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { serverUrl } = useContext(authDataContext)
    let { getAdmin } = useContext(adminDataContext)
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { theme } = useContext(ThemeContext)

    const AdminLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
            console.log(result.data)
            toast.success("Admin Login Successfully")
            getAdmin()
            navigate("/")
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error("Admin Login Failed")
            setLoading(false)
        }
    }

    return (
        <div className={`w-full min-h-screen relative flex items-center justify-center overflow-hidden py-12 ${
            theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
        }`}>
            {/* Glass Login Card */}
            <div className='max-w-[460px] w-[90%] p-8 rounded-2xl glass-panel z-10 shadow-2xl transition-all duration-300 flex flex-col gap-6 items-center'>
                
                {/* Brand Logo and Title */}
                <div className='flex flex-col items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                    <img className='w-12 h-12 object-contain' src={logo} alt="Logo" />
                    <h1 className='text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent'>Solivana</h1>
                </div>

                {/* Welcome Message */}
                <div className='text-center flex flex-col gap-1 w-full border-b border-slate-200/10 pb-4'>
                    <h2 className='text-xl font-bold tracking-tight'>Admin Portal</h2>
                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Welcome to Solivana. Sign in to your administrator account.
                    </p>
                </div>

                <form onSubmit={AdminLogin} className='w-full flex flex-col gap-5'>
                    {/* Input Fields */}
                    <div className='w-full flex flex-col gap-4 relative'>
                        <div className="relative">
                            <input 
                                type="email" 
                                className={`w-full h-11 rounded-xl border px-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    theme === 'dark' 
                                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-500' 
                                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                                }`} 
                                placeholder='Admin Email' 
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
                                placeholder='Admin Password' 
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
                            {loading ? <Loading /> : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
