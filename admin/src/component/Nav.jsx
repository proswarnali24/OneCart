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
  <div className={`w-[100vw] h-[70px] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#dcdbdbf8] text-black'}`}>
        <div className='w-[30%]  flex items-center justify-start   gap-[10px] cursor-pointer ' onClick={()=>navigate("/")}>
        <img src={logo} alt=""  className='w-[30px]'/>
        <h1 className='text-[25px] font-sans '>OneCart</h1>

       


        </div>
        <div className='flex items-center gap-3'>
          <button
            className='text-[13px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#111827] py-[8px] px-[18px] rounded-2xl text-white'
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
         <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white ' onClick={logOut}>LogOut</button>
        </div>
      
    </div>
  )
}

export default Nav
