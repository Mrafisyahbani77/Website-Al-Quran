import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function SurahList() {
  const [surahList, setSurahList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
    <>
    <Navbar/>
      <div id="list-alquran" className="container my-20 mx-auto px-4 min-h-screen flex flex-col">
        <h2 className="text-3xl font-bold text-center my-4">List of Surah</h2>
        <div className="mb-10 mt-10">
          <input
            type="text"
            className="w-full p-2 text-black border border-gray-300 rounded"
            placeholder="example search al-fatihah"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

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
                  <div className="text-center">
                    <p className="font-semibold">{surah.nama_latin}</p>
                    <p className="italic group-hover:text-purple-500 text-xs md:text-xs text-gray-600">
                      {surah.arti}
                    </p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-semibold">{surah.nama}</h2>
                    <p className="group-hover:text-purple-500">
                      {surah.jumlah_ayat} Ayat
                    </p>
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
      <Footer />
    </>
  );
}
