import { IoSunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Icon1 from "../assets/icon1.png";
import Icon2 from "../assets/icon2.jpeg";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [isShifted, setIsShifted] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setIsShifted(!isShifted);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#1B4332] via-[#2D5F4D] to-[#1B4332] p-5 shadow-2xl border-b-4 border-[#F4C542]">
        <div className="container mx-auto flex justify-between items-center">
          <span className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={Icon2} 
                alt="Icon" 
                className="w-12 h-12 rounded-xl border-2 border-[#F4C542] group-hover:scale-110 transition-transform duration-300 shadow-lg" 
              />
              <div className="absolute inset-0 bg-[#F4C542]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-3xl font-bold text-[#EADCC8] group-hover:text-[#F4C542] transition-colors duration-300">
              Al-Quran
            </h1>
          </span>

          {/* <button
            className="px-3 py-3 bg-[#F4C542] text-[#1B4332] rounded-full hover:bg-[#EADCC8] hover:scale-110 transition-all duration-300 shadow-lg"
            onClick={toggleDarkMode}
          >
            {darkMode ? <IoSunnyOutline className="text-xl" /> : <IoMoon className="text-xl" />}
          </button> */}
        </div>
      </nav>
      <main className="relative bg-gradient-to-br from-[#EADCC8] via-[#E8D4BF] to-[#DCC9B0] py-20 px-7 min-h-screen flex flex-col items-center justify-center">
        <Particle className="absolute top-0 left-0 w-full h-full" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#F4C542]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#1B4332]/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4C542] to-[#C84B31] rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <img
              src={Icon1}
              alt="img al-quran"
              className="relative mx-auto rounded-full bg-white border-4 border-[#F4C542] w-48 md:w-56 lg:w-64 shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B4332] leading-tight">
              Al-Qur'an Online
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#F4C542] to-transparent mx-auto"></div>
          </div>
          
          <h3 className="text-xl md:text-2xl lg:text-3xl text-[#5A3825] font-medium max-w-2xl mx-auto leading-relaxed">
            Baca Al-Qur'an secara online dimana dan kapanpun saja dengan mudah.
          </h3>
          
          <a href="#list-alquran" className="mt-8 inline-block group">
            <button className="relative px-8 py-4 bg-gradient-to-r from-[#1B4332] to-[#2D5F4D] text-[#EADCC8] rounded-2xl text-xl md:text-2xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg">
              <span className="relative z-10 flex items-center gap-3">
                Mulai Membaca
                <svg 
                  className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] to-[#C84B31] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </a>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 pt-8">
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border-2 border-[#F4C542]/30 shadow-md hover:shadow-lg transition-all duration-300">
              <span className="text-[#1B4332] font-semibold text-sm">📖 114 Surah</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border-2 border-[#F4C542]/30 shadow-md hover:shadow-lg transition-all duration-300">
              <span className="text-[#1B4332] font-semibold text-sm">🎧 Audio Tersedia</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border-2 border-[#F4C542]/30 shadow-md hover:shadow-lg transition-all duration-300">
              <span className="text-[#1B4332] font-semibold text-sm">🌐 Akses Gratis</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}