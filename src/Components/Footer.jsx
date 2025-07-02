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
    color: "hover:bg-gray-600",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@rafiofficial958",
    icon: Yt,
    iconComponent: FaYoutube,
    color: "hover:bg-red-600",
  },
  {
    name: "Gmail",
    url: "mailto:mrafi.syahbani@gmail.com",
    icon: Gm,
    iconComponent: FaEnvelope,
    color: "hover:bg-red-500",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/rafyxz77/",
    icon: Ig,
    iconComponent: FaInstagram,
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-700">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-2 rounded-lg">
                <img src={Icon2} alt="Al-Quran Icon" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Al-Quran Digital
                </h3>
                <p className="text-sm text-slate-400">
                  Baca, Dengar, Renungkan
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Platform digital untuk membaca dan mendengarkan Al-Quran dengan
              terjemahan bahasa Indonesia yang mudah dipahami.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Fitur Utama
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
                📖 Baca Al-Quran
              </li>
              <li className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
                🔊 Audio Murottal
              </li>
              <li className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
                🌙 Terjemahan Indonesia
              </li>
              {/* <li className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
                📱 Responsive Design
              </li> */}
            </ul>
          </div>

          {/* Developer Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">Developer</h4>
            <div className="mb-4">
              <p className="text-slate-300 font-medium">
                Muhammad Rafi Syahbani
              </p>
              <p className="text-slate-400 text-sm">Full-Stack Developer</p>
              <div className="flex items-center justify-center md:justify-end gap-1 mt-2 text-slate-400 text-sm">
                <IoLocationSharp className="text-yellow-400" />
                <span>Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        {/* <div className="border-t border-slate-700 pt-8 mb-8">
          <h4 className="text-center text-lg font-semibold text-white mb-6">
            Hubungi Developer
          </h4>
        </div> */}

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                © {currentYear} Al-Quran Digital. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>by Muhammad Rafi Syahbani</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 bg-slate-800 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${link.color} shadow-lg hover:shadow-xl`}
                title={link.name}
              >
                {/* Using icon component for better styling */}
                <link.iconComponent className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-200" />

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {link.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                </div>
              </a>
            ))}
          </div>

          {/* Islamic Quote */}
          {/* <div className="mt-6 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <p className="text-yellow-300 italic text-sm mb-2">
                "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ
                لِّلْمُؤْمِنِينَ"
              </p>
              <p className="text-slate-400 text-xs">
                "Dan Kami turunkan dari Al-Quran (sesuatu) yang menjadi
                penyembuh dan rahmat bagi orang yang beriman" - QS. Al-Isra: 82
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Decorative Bottom Border */}
      {/* <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div> */}
    </footer>
  );
};

export default Footer;
