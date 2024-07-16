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
      <h1 className="text-3xl font-bold text-center my-4">List of Surah</h1>
      {selectedSurah ? (
        <SurahDetail surah={selectedSurah} />
      ) : (
        <div className="flex-grow flex justify-center items-center">
          {surahList.length > 0 ? (
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {surahList.map((surah) => (
                <div
                  key={surah.nomor}
                  className="border p-4 rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleClickSurah(surah.nomor)}
                >
                  <span className="float-right">
                    <h2 className="text-xl font-semibold">{surah.nama}</h2>
                  </span>
                  <p className="font-semibold">{surah.nama_latin}</p>
                  <p className="italic text-gray-600">{surah.arti}</p>
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
