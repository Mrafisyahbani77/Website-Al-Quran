import React, { useEffect, useState } from "react";
import axios from "axios";
import SurahDetail from "./Detail/SurahDetail"; // Sesuaikan path import sesuai struktur file Anda

export default function App() {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

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
    axios
      .get(`https://quran-api.santrikoding.com/api/surah/${surahNomor}`)
      .then((response) => {
        setSelectedSurah(response.data);
      })
      .catch((error) => {
        console.error("Error fetching surah details:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold my-4">Al-Quran</h1>
      <h2 className="text-3xl font-bold text-center my-4">List of Surah</h2>
      <hr className="border-t-2 border-gray-300 my-4 mb-10" />
      {selectedSurah ? (
        <SurahDetail surah={selectedSurah} />
      ) : (
        <div className="flex-grow">
          {surahList.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {surahList.map((surah) => (
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
      )}
    </div>
  );
}
