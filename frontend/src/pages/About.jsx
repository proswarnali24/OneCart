import React, { useContext } from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'
import { ThemeContext } from '../context/ThemeContext'

function About() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`w-full min-h-screen flex items-center justify-center flex-col gap-12 pt-24 transition-all-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Decorative blobs */}
      <div className="glowing-blob bg-indigo-500/10 w-96 h-96 top-[15%] left-[5%]"></div>
      <div className="glowing-blob bg-cyan-500/10 w-96 h-96 bottom-[15%] right-[5%]"></div>

      <Title text1={'ABOUT'} text2={'US'}/>
      
      {/* Main Info Block */}
      <div className='w-full max-w-7xl px-6 md:px-12 flex items-center justify-center flex-col lg:flex-row gap-8 z-10'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img src={about} alt="About Us" className='w-full max-w-md rounded-2xl shadow-xl border border-slate-200/20' />
        </div>
        <div className='lg:w-1/2 w-full flex flex-col gap-6 items-start justify-center'>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-350' : 'text-slate-650'}`}>
            Solivana was born out of a desire for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, Solivana makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-350' : 'text-slate-650'}`}>
            We cater to modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          
          <h3 className='text-xl font-bold tracking-tight mt-2'>Our Mission</h3>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-350' : 'text-slate-650'}`}>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. Solivana connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Why Choose Us Grid */}
      <div className='w-full max-w-7xl px-6 md:px-12 flex flex-col items-center justify-center gap-6 mt-6 z-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-6'>
          <div className='p-8 rounded-2xl border glass-panel flex flex-col gap-4 text-center items-center hover:scale-[102%] transition-transform duration-300'>
            <b className='text-lg font-bold text-indigo-500'>Quality Assurance</b>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>
          </div>
          <div className='p-8 rounded-2xl border glass-panel flex flex-col gap-4 text-center items-center hover:scale-[102%] transition-transform duration-300'>
            <b className='text-lg font-bold text-indigo-500'>Convenience</b>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>
          <div className='p-8 rounded-2xl border glass-panel flex flex-col gap-4 text-center items-center hover:scale-[102%] transition-transform duration-300'>
            <b className='text-lg font-bold text-indigo-500'>Exceptional Service</b>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>
        </div>
      </div>
      
      <NewLetterBox/>
    </div>
  )
}

export default About
