import { IoSunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Icon1 from "../assets/icon1.png";
import SurahList from "../List/SurahList";

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
      <nav className="bg-gray-800 dark:bg-gray-900 p-5 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Al-Quran</h1>
          <div className="relative hover:shadow-purple-400 hover:shadow-md mt-2 p-1 mx-3 max-w-[5%] rounded-full border-slate-700 border">
            <button
              className={`bg-black  text-white p-2 rounded-full transition-transform duration-300 ${
                isShifted ? "translate-x-6" : "translate-x-0"
              }`}
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <IoSunnyOutline className="text-yellow-400" />
              ) : (
                <IoMoon className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>
      <main className="relative bg-yellow-500 py-10 px-7 min-h-screen flex flex-col items-center justify-center">
        <Particle className="absolute top-0 left-0 w-full h-full" />
        <div className="relative z-10 text-center space-y-6">
          <img
            src={Icon1}
            alt="img al-quran"
            className="mx-auto rounded-full bg-gray-900 w-1/3 md:w-1/4 lg:w-1/5"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Al-Qur'an Online
          </h1>
          <h3 className="text-lg md:text-xl lg:text-2xl text-white">
            Baca Al-Qur'an secara online dimana dan kapanpun saja dengan mudah.
          </h3>
          <a href="#list-alquran" className="mt-6 inline-block">
            <button className="px-6 py-3 bg-white text-yellow-500 rounded-full text-lg md:text-xl font-semibold hover:bg-yellow-600 hover:text-white transition duration-300">
              Mulai Membaca
            </button>
          </a>
        </div>
      </main>
    </>
  );
}
