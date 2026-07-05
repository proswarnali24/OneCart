import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
import { ThemeContext } from '../context/ThemeContext';

function Nav() {
    let { userData, setUserData } = useContext(userDataContext)
    let { serverUrl } = useContext(authDataContext)
    let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    let [showProfile, setShowProfile] = useState(false)
    let navigate = useNavigate()
    let location = useLocation()
    const { theme, toggleTheme } = useContext(ThemeContext)

    const handleLogout = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
            localStorage.removeItem("onecart_token")
            setUserData(null)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `text-[13px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
            isActive 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-105' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
        }`;
    };

    return (
        <div className={`w-full h-[70px] z-30 fixed top-0 flex items-center justify-between px-6 md:px-12 transition-all-300 border-b ${
            theme === 'dark' 
                ? 'bg-slate-950/75 border-slate-800/50 text-white backdrop-blur-md' 
                : 'bg-slate-50/75 border-slate-200/50 text-slate-900 backdrop-blur-md'
        }`}>

            {/* Brand Logo */}
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
                <img src={logo} alt="Logo" className='w-8 h-8 object-contain transition-transform hover:rotate-12 duration-300' />
                <h1 className='text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent'>
                    Solivana
                </h1>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center'>
                <ul className='flex items-center gap-2'>
                    <li className={getLinkClass("/")} onClick={() => navigate("/")}>Home</li>
                    <li className={getLinkClass("/collection")} onClick={() => navigate("/collection")}>Collections</li>
                    <li className={getLinkClass("/about")} onClick={() => navigate("/about")}>About</li>
                    <li className={getLinkClass("/contact")} onClick={() => navigate("/contact")}>Contact</li>
                </ul>
            </div>

            {/* Icons Actions */}
            <div className='flex items-center gap-4 relative'>
                {/* Search Toggle */}
                {!showSearch && (
                    <IoSearchCircleOutline 
                        className="w-9 h-9 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" 
                        onClick={() => { setShowSearch(true); navigate("/collection") }} 
                    />
                )}
                {showSearch && (
                    <IoSearchCircleSharp 
                        className="w-9 h-9 cursor-pointer text-indigo-500 hover:scale-110 transition-all duration-200" 
                        onClick={() => setShowSearch(false)} 
                    />
                )}

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className='hidden md:inline-block text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all duration-200 cursor-pointer'
                >
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>

                {/* Shopping Cart Icon (Desktop) */}
                <div className='relative hidden md:block cursor-pointer' onClick={() => navigate("/cart")}>
                    <MdOutlineShoppingCart className="w-7 h-7 opacity-80 hover:opacity-100 hover:scale-115 transition-all duration-200" />
                    {getCartCount() > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-[9px] animate-bounce shadow-md">
                            {getCartCount()}
                        </span>
                    )}
                </div>

                {/* Profile Icon / User Menu */}
                <div className="relative">
                    {userData ? (
                        <div 
                            className='w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white font-bold flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform' 
                            onClick={() => setShowProfile(prev => !prev)}
                        >
                            {userData.name.slice(0,1).toUpperCase()}
                        </div>
                    ) : (
                        <FaCircleUser 
                            className="w-7 h-7 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200" 
                            onClick={() => setShowProfile(prev => !prev)} 
                        />
                    )}

                    {/* Profile Dropdown */}
                    {showProfile && (
                        <div className={`absolute right-0 top-[120%] w-56 rounded-xl border shadow-xl z-50 overflow-hidden glass-panel ${
                            theme === 'dark' ? 'bg-slate-950/90 border-slate-850' : 'bg-white/90 border-slate-200'
                        }`}>
                            <ul className='flex flex-col text-[14px] font-medium py-1.5'>
                                {!userData ? (
                                    <li 
                                        className='px-4 py-2.5 hover:bg-indigo-500 hover:text-white cursor-pointer transition-colors duration-150' 
                                        onClick={() => { navigate("/login"); setShowProfile(false) }}
                                    >
                                        Login
                                    </li>
                                ) : (
                                    <li 
                                        className='px-4 py-2.5 hover:bg-red-500 hover:text-white cursor-pointer transition-colors duration-150 border-b border-slate-200/20' 
                                        onClick={() => { handleLogout(); setShowProfile(false) }}
                                    >
                                        Log Out
                                    </li>
                                )}
                                <li 
                                    className='px-4 py-2.5 hover:bg-indigo-500 hover:text-white cursor-pointer transition-colors duration-150'
                                    onClick={() => { navigate("/order"); setShowProfile(false) }}
                                >
                                    Orders
                                </li>
                                <li 
                                    className='px-4 py-2.5 hover:bg-indigo-500 hover:text-white cursor-pointer transition-colors duration-150'
                                    onClick={() => { navigate("/about"); setShowProfile(false) }}
                                >
                                    About Solivana
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Input Slide-Down Panel */}
            {showSearch && (
                <div className={`absolute top-[100%] left-0 right-0 h-16 border-b flex items-center justify-center z-20 px-6 transition-all duration-300 ${
                    theme === 'dark' 
                        ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md' 
                        : 'bg-slate-100/90 border-slate-200 text-slate-900 backdrop-blur-md'
                }`}>
                    <input 
                        type="text" 
                        className='w-full max-w-lg h-10 bg-white/10 dark:bg-slate-950/40 rounded-full border border-slate-300 dark:border-slate-800 px-6 focus:outline-none focus:border-indigo-500 transition-all duration-200' 
                        placeholder='Search products...' 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search} 
                    />
                </div>
            )}

            {/* Mobile Bottom Navigation Bar */}
            <div className={`fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around border-t z-35 md:hidden ${
                theme === 'dark' 
                    ? 'bg-slate-950/90 border-slate-800 text-white backdrop-blur-md' 
                    : 'bg-slate-50/90 border-slate-200 text-slate-800 backdrop-blur-md'
            }`}>
                <button className='flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-indigo-500 transition-colors' onClick={() => navigate("/")}>
                    <IoMdHome className='w-6 h-6' /> Home
                </button>
                <button className='flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-indigo-500 transition-colors' onClick={() => navigate("/collection")}>
                    <HiOutlineCollection className='w-6 h-6' /> Collections
                </button>
                <button className='flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-indigo-500 transition-colors' onClick={() => navigate("/contact")}>
                    <MdContacts className='w-6 h-6' /> Contact
                </button>
                <button className='flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-indigo-500 transition-colors relative' onClick={() => navigate("/cart")}>
                    <MdOutlineShoppingCart className='w-6 h-6' /> Cart
                    {getCartCount() > 0 && (
                        <span className="absolute top-0 right-2.5 w-4 h-4 flex items-center justify-center bg-indigo-600 text-white rounded-full text-[8px] font-bold shadow-md">
                            {getCartCount()}
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default Nav
