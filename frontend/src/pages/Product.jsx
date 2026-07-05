import React, { useContext } from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import { ThemeContext } from '../context/ThemeContext'

function Product() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`w-full min-h-screen flex items-center justify-start flex-col py-12 transition-all-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Decorative blobs for depth */}
      <div className="glowing-blob bg-indigo-500/10 w-96 h-96 top-[-10%] left-[-10%]"></div>
      <div className="glowing-blob bg-cyan-500/10 w-96 h-96 bottom-[-10%] right-[-10%]"></div>

      <div className='w-full min-h-[70px] flex items-center justify-center gap-6 flex-col z-10'>
        <LatestCollection/>
      </div>
      <div className='w-full min-h-[70px] flex items-center justify-center gap-6 flex-col mt-12 z-10'>
        <BestSeller/>
      </div>
    </div>
  )
}

export default Product
