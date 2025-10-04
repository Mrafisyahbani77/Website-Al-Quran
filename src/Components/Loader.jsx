import React from 'react';
import Icon2 from "../assets/icon2.jpeg";

const Loader = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#EADCC8] via-[#F5E6D3] to-[#E8D4BF]">
    <div className="relative w-24 h-24">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 w-24 h-24 border-4 border-[#F4C542] border-t-transparent rounded-full animate-spin"></div>
      
      {/* Middle rotating ring (opposite direction) */}
      <div className="absolute inset-2 w-20 h-20 border-4 border-[#1B4332] border-b-transparent rounded-full" style={{ animation: 'spin 1.5s linear infinite reverse' }}></div>
      
      {/* Inner rotating ring */}
      <div className="absolute inset-4 w-16 h-16 border-4 border-[#C84B31] border-l-transparent rounded-full animate-spin"></div>
      
      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={Icon2} 
          alt="Al-Quran Icon" 
          className="w-12 h-12 rounded-lg object-cover animate-pulse"
        />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-[#F4C542]/20 to-[#C84B31]/20 rounded-full blur-xl animate-pulse"></div>
    </div>
    
    {/* Loading text */}
    <div className="mt-8 text-center">
      <p className="text-[#1B4332] text-lg font-bold animate-pulse">
        Memuat Al-Quran...
      </p>
      <div className="flex gap-1 justify-center mt-3">
        <span className="w-2 h-2 bg-[#F4C542] rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
        <span className="w-2 h-2 bg-[#C84B31] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      </div>
    </div>
  </div>
);

export default Loader;