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
      <nav className="bg-gray-800 dark:bg-gray-900 p-5 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <span className="flex">
            <img src={Icon2} alt="Icon" className="w-10 mr-3 rounded-xl h-10" />
            <h1 className="text-3xl font-bold text-white">Al-Quran</h1>
          </span>

          <button
            className="px-2 py-2 bg-black text-white rounded-full"
            onClick={toggleDarkMode}
          >
            {darkMode ? <IoSunnyOutline /> : <IoMoon />}
          </button>
        </div>
      </nav>
      <main className="relative bg-gray-500 py-10 px-7 min-h-screen flex flex-col items-center justify-center">
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
          <h3 className="text-lg md:text-xl lg:text-2xl text-gray-300 font-sans">
            Baca Al-Qur'an secara online dimana dan kapanpun saja dengan mudah.
          </h3>
          <a href="#list-alquran" className="mt-6 inline-block">
            <button className="px-6 py-3 bg-white text-black rounded-full text-lg md:text-xl font-semibold hover:bg-black hover:text-yellow-500 transition duration-300">
              Mulai Membaca
            </button>
          </a>
        </div>
      </main>
    </>
  );
}
