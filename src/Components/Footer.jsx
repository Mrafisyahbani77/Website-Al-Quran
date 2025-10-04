import React from "react";
import {
  FaHeart,
  FaGithub,
  FaYoutube,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Ig from "../assets/Ig.png";
import Gm from "../assets/gmail.png";
import Yt from "../assets/youtube.png";
import Git from "../assets/git.png";
import Logo from "../assets/Rapi.png";
import Icon1 from "../assets/icon1.png";
import Icon2 from "../assets/icon2.jpeg";

const socialMediaLinks = [
  {
    name: "GitHub",
    url: "https://www.github.com/Mrafisyahbani77",
    icon: Git,
    iconComponent: FaGithub,
    color: "hover:bg-[#1B4332]",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@rafiofficial958",
    icon: Yt,
    iconComponent: FaYoutube,
    color: "hover:bg-[#C84B31]",
  },
  {
    name: "Gmail",
    url: "mailto:mrafi.syahbani@gmail.com",
    icon: Gm,
    iconComponent: FaEnvelope,
    color: "hover:bg-[#C84B31]",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/rafyxz77/",
    icon: Ig,
    iconComponent: FaInstagram,
    color: "hover:bg-gradient-to-r hover:from-[#C84B31] hover:to-[#F4C542]",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#EADCC8] to-[#DCC9B0] border-t-4 border-[#F4C542]">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-white p-2 rounded-xl border-2 border-[#F4C542] shadow-lg">
                <img src={Icon2} alt="Al-Quran Icon" className="w-10 h-10" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-[#1B4332]">
                  Al-Quran Digital
                </h3>
                <p className="text-sm text-[#5A3825] font-medium">
                  Baca, Dengar, Renungkan
                </p>
              </div>
            </div>
            <p className="text-[#5A3825] text-sm max-w-md mx-auto leading-relaxed">
              Platform digital untuk membaca dan mendengarkan Al-Quran dengan terjemahan bahasa Indonesia
            </p>
          </div>

          {/* Quick Features */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-[#F4C542]/30 text-[#1B4332] text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              📖 114 Surah
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-[#F4C542]/30 text-[#1B4332] text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              🔊 Audio Murottal
            </span>
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-[#F4C542]/30 text-[#1B4332] text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              🌙 Terjemahan ID
            </span>
          </div>

          {/* Social Media Links */}
          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#1B4332]">
              Connect with Developer
            </h4>
            <div className="flex justify-center gap-4">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 bg-white rounded-xl border-2 border-[#1B4332]/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${link.color} shadow-lg hover:shadow-xl`}
                  title={link.name}
                >
                  <link.iconComponent className="w-6 h-6 text-[#1B4332] group-hover:text-white transition-colors duration-200" />

                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#1B4332] text-[#EADCC8] text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-semibold shadow-lg">
                    {link.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1B4332]"></div>
                  </div>
                </a>
              ))}
            </div>
          </div> */}

          {/* Developer Info */}
          {/* <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#F4C542]/30 shadow-lg">
            <div className="space-y-2">
              <p className="text-[#1B4332] font-bold text-lg">
                Muhammad Rafi Syahbani
              </p>
              <p className="text-[#5A3825] text-sm font-medium">
                Full-Stack Developer
              </p>
              <div className="flex items-center justify-center gap-1 text-[#5A3825] text-sm">
                <IoLocationSharp className="text-[#C84B31]" />
                <span>Indonesia</span>
              </div>
            </div>
          </div> */}

          {/* Bottom Copyright */}
          <div className="pt-6 border-t-2 border-[#1B4332]/10 space-y-3">
            {/* <div className="flex items-center justify-center gap-2 text-[#5A3825] text-sm">
              <span>Made with</span>
              <FaHeart className="text-[#C84B31] animate-pulse" />
              <span>for the Ummah</span>
            </div> */}
            <p className="text-[#5A3825] text-xs">
              © {currentYear} Al-Quran Digital. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-[#1B4332] via-[#F4C542] to-[#1B4332]"></div>
    </footer>
  );
};

export default Footer;