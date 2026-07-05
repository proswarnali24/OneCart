import React, { useEffect, useState, useContext } from 'react'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { ThemeContext } from '../context/ThemeContext'
import { FaCircle } from "react-icons/fa"

import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

function Home() {
  const { theme } = useContext(ThemeContext)
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Elevate Your Style" },
    { text1: "Discover Bold Fashion", text2: "Limited Time Sale" },
    { text1: "Explore Curated Designs", text2: "Shop the Collection" },
    { text1: "Choose Your Perfect Fit", text2: "Now on Sale" }
  ]

  const images = [back2, back1, back3, back4]
  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    }, 5000);
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className='w-full relative overflow-x-hidden pt-[70px]'>
      {/* Hero Carousel Section */}
      <div className='relative w-full h-[50vh] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-slate-900'>
        {/* Background Images with Crossfade */}
        {images.map((img, index) => (
          <img 
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === heroCount ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Theme-Adaptive Gradient Overlay */}
        <div className={`absolute inset-0 z-10 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent' 
            : 'bg-gradient-to-r from-white/90 via-white/40 to-transparent'
        }`} />

        {/* Hero Overlay Content */}
        <div className='absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-2xl'>
          <span className='text-xs md:text-sm font-extrabold tracking-widest text-indigo-500 uppercase mb-2 animate-fade-in'>
            {heroData[heroCount].text1}
          </span>
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6 transition-all duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {heroData[heroCount].text2}
          </h2>
          
          <button 
            onClick={() => {
              const el = document.getElementById('products-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className='w-fit px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold rounded-xl text-sm tracking-wider uppercase shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all duration-200 cursor-pointer'
          >
            Shop Now
          </button>
        </div>

        {/* Indicators Slider */}
        <div className='absolute bottom-6 left-8 md:left-16 lg:left-24 z-20 flex items-center gap-2.5'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroCount(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === heroCount 
                  ? 'bg-indigo-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main product listings and components */}
      <div id="products-section">
        <Product />
      </div>
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
