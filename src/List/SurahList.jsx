import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

export default function SurahList() {
  const [surahList, setSurahList] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
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

  useEffect(() => {
    axios
      .get("https://quran-api.santrikoding.com/api/surah")
      .then((response) => {
        setSurahList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClickSurah = (surahNomor) => {
    navigate(`/surah/${surahNomor}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSurahList = surahList.filter((surah) =>
    surah.nama_latin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold my-4">Al-Quran</h1>
      
      <div className="relative hover:shadow-purple-400 hover:shadow-md mt-2 p-4 mx-3 max-w-[27%] md:max-w-[8%] rounded-full border-slate-700 border">
        <button
          className={`absolute top-0 left-0 px-3 py-2 bg-gradient-to-l to-gray-500 from-gray-700 text-white rounded-full transform transition-transform duration-300 ${
            isShifted ? "translate-x-10" : "translate-x-0"
          }`}
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <IoSunnyOutline className="text-yellow-30" />
          ) : (
            <IoMoon className="text-black" />
          )}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center my-4">List of Surah</h2>
      
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search by Latin name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <hr className="border-t-2 border-gray-300 my-4 mb-10" />

      <div className="flex-grow">
        {filteredSurahList.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSurahList.map((surah) => (
              <div
                key={surah.nomor}
                className="border rounded-lg group p-4 cursor-pointer hover:shadow-md hover:shadow-purple-500 flex items-center justify-between"
                onClick={() => handleClickSurah(surah.nomor)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 group-hover:bg-purple-500 bg-gray-600 transform rotate-45 rounded-lg flex items-center justify-center">
                    <p className="font-semibold transform -rotate-45">
                      {surah.nomor}
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="font-semibold">{surah.nama_latin}</p>
                  <p className="italic group-hover:text-purple-500 text-xs md:text-sm text-gray-600">
                    {surah.arti}
                  </p>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-semibold">{surah.nama}</h2>
                  <p className="group-hover:text-purple-500">{surah.jumlah_ayat} Ayat</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full border-t-4 border-blue-700 border-opacity-25 h-16 w-16"></div>
          </div>
        )}
      </div>
    </div>
  );
}
