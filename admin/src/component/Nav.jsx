import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { ThemeContext } from '../context/ThemeContext'

function Nav() {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
            console.log(result.data)
            toast.success("LogOut Successfully")
            getAdmin()
            navigate("/login")

        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
        
    }
  return (
  <div className={`w-full h-[70px] z-10 fixed top-0 flex items-center justify-between px-8 border-b ${theme === 'dark' ? 'bg-slate-950/75 border-slate-800/50 text-white backdrop-blur-md' : 'bg-slate-50/75 border-slate-200/50 text-black backdrop-blur-md'}`}>
        <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={()=>navigate("/")}>
        <img src={logo} alt="Logo" className='w-8 h-8 object-contain'/>
        <h1 className='text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent'>Solivana</h1>
        </div>
        <div className='flex items-center gap-3'>
          <button
            className='text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all duration-200 cursor-pointer'
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
         <button className='text-[13px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-all duration-200 cursor-pointer' onClick={logOut}>LogOut</button>
        </div>
      
    </div>
  )
}

export default Nav
