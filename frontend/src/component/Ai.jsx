import React, { useContext, useState, useEffect, useMemo } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"
import { ThemeContext } from '../context/ThemeContext'

function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  const { theme } = useContext(ThemeContext)
  
  let openingSound = useMemo(() => new Audio(open), [])

  function speak(message){
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const speechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null
  const recognition = useMemo(() => speechRecognition ? new speechRecognition() : null, [speechRecognition])

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (e)=>{
      const transcript = e.results[0][0].transcript.trim();
      if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch) {
        speak("opening search")
        setShowSearch(true) 
        navigate("/collection")
      }
      else if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch) {
        speak("closing search")
        setShowSearch(false) 
      }
      else if (transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")) {
        speak("opening collection page")
        navigate("/collection")
      }
      else if (transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")) {
        speak("opening about page")
        navigate("/about")
        setShowSearch(false) 
      }
      else if (transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage")) {
        speak("opening home page")
        navigate("/")
        setShowSearch(false) 
      }
      else if (transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")) {
        speak("opening your cart")
        navigate("/cart")
        setShowSearch(false) 
      }
      else if (transcript.toLowerCase().includes("contact")) {
        speak("opening contact page")
        navigate("/contact")
        setShowSearch(false) 
      }
      else if (transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")) {
        speak("opening your orders page")
        navigate("/order")
        setShowSearch(false) 
      }
      else {
        toast.error("Try Again")
      }
    }

    recognition.onend = ()=>{
      setActiveAi(false)
    }
  }, [recognition, showSearch, navigate, setShowSearch])

  return (
    <div 
      className={`fixed left-6 md:left-8 bottom-20 md:bottom-8 z-40 flex items-center justify-center rounded-full p-3 shadow-xl border transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
        activeAi 
          ? 'bg-indigo-600 border-indigo-500 shadow-indigo-500/20 scale-110 ring-4 ring-indigo-500/10' 
          : theme === 'dark' 
            ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md' 
            : 'bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md shadow-sm'
      }`}
      onClick={() => {
        if (recognition) {
          try {
            recognition.start();
            openingSound.play();
            setActiveAi(true);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error("Speech recognition not supported in this browser.")
        }
      }}
    >
      <img 
        src={ai} 
        alt="AI Assistant" 
        className={`w-10 h-10 md:w-12 md:h-12 object-contain transition-transform ${
          activeAi ? 'animate-pulse' : ''
        }`} 
      />
    </div>
  )
}

export default Ai
