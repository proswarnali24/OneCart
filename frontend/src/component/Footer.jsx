import React, { useContext } from 'react'
import logo from "../assets/logo.png"
import { ThemeContext } from '../context/ThemeContext'

function Footer() {
  const { theme } = useContext(ThemeContext)

  return (
    <footer className={`w-full transition-all-300 border-t ${
      theme === 'dark' ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-100/60 border-slate-200 text-slate-700'
    } pb-[77px] md:pb-0`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Solivana Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Solivana
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Solivana is your premium online shopping destination, offering top-quality fashion and everyday essentials, backed by customer service designed to make your style choice effortless.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col md:items-center">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-500">Company</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li className="hover:text-indigo-500 cursor-pointer transition-colors">Home</li>
              <li className="hover:text-indigo-500 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-indigo-500 cursor-pointer transition-colors">Delivery</li>
              <li className="hover:text-indigo-500 cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col md:items-end">
          <div className="flex flex-col gap-4 md:items-start max-w-xs w-full">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-500">Get In Touch</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">+91-9876543210</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">contact@solivana.com</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">+1-123-456-7890</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">admin@solivana.com</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className={`w-full py-4 text-center text-xs font-semibold border-t ${
        theme === 'dark' ? 'border-slate-800 text-slate-500 bg-slate-950/40' : 'border-slate-200 text-slate-400 bg-slate-100/40'
      }`}>
        Copyright 2026 @ solivana.com - All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
