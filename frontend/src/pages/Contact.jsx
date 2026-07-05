import React, { useContext } from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'
import { ThemeContext } from '../context/ThemeContext'

function Contact() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`w-full min-h-screen flex items-center justify-center flex-col gap-12 pt-24 transition-all-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Decorative blobs */}
      <div className="glowing-blob bg-indigo-500/10 w-96 h-96 top-[10%] right-[10%]"></div>
      <div className="glowing-blob bg-cyan-500/10 w-96 h-96 bottom-[10%] left-[10%]"></div>

      <Title text1={'CONTACT'} text2={'US'}/>
      
      {/* Contact Content block */}
      <div className='w-full max-w-7xl px-6 md:px-12 flex items-center justify-center flex-col lg:flex-row gap-8 z-10'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img src={contact} alt="Contact Us" className='w-full max-w-md rounded-2xl shadow-xl border border-slate-200/20' />
        </div>
        <div className='lg:w-1/2 w-full flex flex-col gap-6 items-start justify-center'>
          <div className="p-6 rounded-2xl border glass-panel w-full max-w-md">
            <h3 className='text-lg font-bold tracking-tight text-indigo-500 mb-3'>Our Store</h3>
            <div className={`text-[15px] flex flex-col gap-1 ${theme === 'dark' ? 'text-slate-350' : 'text-slate-650'}`}>
              <p>12345 Random Station</p>
              <p>Random City, State, India</p>
            </div>
            
            <div className={`text-[15px] mt-4 flex flex-col gap-1 ${theme === 'dark' ? 'text-slate-350' : 'text-slate-650'}`}>
              <p>Tel: +91-9876543210</p>
              <p>Email: admin@solivana.com</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border glass-panel w-full max-w-md flex flex-col gap-4">
            <div>
              <h3 className='text-lg font-bold tracking-tight text-indigo-500'>Careers at Solivana</h3>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Learn more about our teams and job openings.
              </p>
            </div>
            <button className='w-fit px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold rounded-xl text-sm transition-all duration-200 hover:scale-105 shadow-md cursor-pointer'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewLetterBox/>
    </div>
  )
}

export default Contact
