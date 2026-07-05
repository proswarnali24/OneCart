import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { ThemeContext } from '../context/ThemeContext'

function Lists() {
  let [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)
  const { theme } = useContext(ThemeContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        fetchList()
      } else {
        console.log("Failed to remove Product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className={`w-full min-h-screen flex flex-col transition-all-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <Nav />
      <div className="flex flex-1 pt-[70px]">
        <Sidebar />
        <div className='flex-1 p-8 md:p-12 z-10 flex flex-col gap-8'>
          <h1 className='text-3xl font-extrabold tracking-tight'>All Listed Products</h1>

          <div className="flex flex-col gap-4 max-w-4xl">
            {list?.length > 0 ? (
              list.map((item, index) => (
                <div 
                  className="p-4 rounded-2xl border glass-panel flex items-center justify-between gap-6 hover:scale-[101%] transition-all duration-300"
                  key={index}
                >
                  {/* Product Image */}
                  <img src={item.image1} className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-950 shrink-0" alt={item.name} />
                  
                  {/* Product Details */}
                  <div className="flex-1 flex flex-col gap-0.5">
                    <h3 className="text-base font-bold tracking-tight text-indigo-500 line-clamp-1">{item.name}</h3>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.category}
                    </span>
                    <span className="text-sm font-extrabold text-indigo-500">₹{item.price}</span>
                  </div>

                  {/* Deletion action button */}
                  <button 
                    onClick={() => removeList(item._id)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-200 cursor-pointer font-bold shrink-0"
                    aria-label="Remove Product"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12 text-slate-500">No products available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lists
