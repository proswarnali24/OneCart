import React, { useContext } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Sidebar() {
    let navigate = useNavigate()
    let location = useLocation()
    const { theme } = useContext(ThemeContext)

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center justify-center md:justify-start gap-3 border border-r-0 px-4 py-3 cursor-pointer transition-all duration-300 rounded-l-xl ${
            isActive 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md translate-x-[1px]' 
                : theme === 'dark'
                    ? 'border-slate-800 text-slate-350 hover:bg-slate-900/60 hover:text-white'
                    : 'border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-900'
        }`;
    }

    return (
        <div className={`w-16 md:w-64 min-h-[calc(100vh-70px)] border-r transition-all duration-300 pt-8 shrink-0 ${
            theme === 'dark' ? 'bg-slate-950/40 border-slate-850' : 'bg-slate-50/40 border-slate-200'
        }`}>
            <div className='flex flex-col gap-3 pl-4 md:pl-8 text-[14px] font-semibold'>
                <div className={getLinkClass('/add')} onClick={() => navigate('/add')}>
                    <IoIosAddCircleOutline className='w-[20px] h-[20px] shrink-0'/>
                    <p className='hidden md:block'>Add Items</p>
                </div>
                <div className={getLinkClass('/lists')} onClick={() => navigate('/lists')}>
                    <FaRegListAlt className='w-[20px] h-[20px] shrink-0'/>
                    <p className='hidden md:block'>List Items</p>
                </div>
                <div className={getLinkClass('/orders')} onClick={() => navigate('/orders')}>
                    <SiTicktick className='w-[20px] h-[20px] shrink-0'/>
                    <p className='hidden md:block'>View Orders</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
