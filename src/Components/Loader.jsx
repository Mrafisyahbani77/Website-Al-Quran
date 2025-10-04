import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#EADCC8] via-[#F5E6D3] to-[#E8D4BF]">
    <div className="relative">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 w-24 h-24 border-4 border-[#F4C542] border-t-transparent rounded-full animate-spin"></div>
      
      {/* Middle rotating ring (opposite direction) */}
      <div className="absolute inset-2 w-20 h-20 border-4 border-[#1B4332] border-b-transparent rounded-full" style={{ animation: 'spin 1.5s linear infinite reverse' }}></div>
      
      {/* Inner rotating ring */}
      <div className="absolute inset-4 w-16 h-16 border-4 border-[#C84B31] border-l-transparent rounded-full animate-spin"></div>
      
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-[#1B4332] animate-pulse" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.15 8.75-8 9.92-4.85-1.17-8-5.4-8-9.92V8.18l8-4zM11 7v2h2V7h-2zm0 4v6h2v-6h-2z"/>
          </svg>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-[#F4C542]/20 to-[#C84B31]/20 rounded-full blur-xl animate-pulse"></div>
    </div>
    
    {/* Loading text */}
    <div className="absolute mt-36 text-center">
      <p className="text-[#1B4332] text-lg font-bold animate-pulse">
        Memuat Al-Quran...
      </p>
      <div className="flex gap-1 justify-center mt-2">
        <span className="w-2 h-2 bg-[#F4C542] rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-[#1B4332] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
        <span className="w-2 h-2 bg-[#C84B31] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      </div>
    </div>


  </div>
);

export default Loader;