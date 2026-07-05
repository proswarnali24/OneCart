import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function Card({name , image , id , price}) {
    let { currency } = useContext(shopDataContext)
    let navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    
    return (
        <div 
            className={`w-[280px] max-w-full h-[380px] rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border ${
                theme === 'dark' 
                    ? 'bg-slate-900/40 hover:bg-slate-900/60 border-slate-800/60 hover:border-slate-700/80 text-white shadow-md' 
                    : 'bg-white/40 hover:bg-white/70 border-slate-200/60 hover:border-slate-300/80 text-slate-900 shadow-sm'
            }`} 
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            {/* Image Container with Zoom effect */}
            <div className="w-full h-[70%] overflow-hidden relative bg-slate-100 dark:bg-slate-950">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
            </div>
            
            {/* Card Content */}
            <div className="p-4 flex flex-col justify-between h-[30%]">
                <h3 className={`text-[15px] font-semibold line-clamp-1 transition-colors ${
                    theme === 'dark' ? 'text-slate-100 hover:text-cyan-400' : 'text-slate-800 hover:text-indigo-600'
                }`}>
                    {name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-[17px] font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                        {currency} {price}
                    </span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                        View Details
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card
