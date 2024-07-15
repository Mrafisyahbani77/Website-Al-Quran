import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SurahDetail from './Detail/SurahDetail'; // Sesuaikan path import sesuai struktur file Anda

export default function App() {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

  useEffect(() => {
    axios
      .get('https://quran-api.santrikoding.com/api/surah')
      .then((response) => {
        setSurahList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClickSurah = (surahNomor) => {
    axios
      .get(`https://quran-api.santrikoding.com/api/surah/${surahNomor}`)
      .then((response) => {
        setSelectedSurah(response.data);
      })
      .catch((error) => {
        console.error('Error fetching surah details:', error);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">List of Surah</h1>
      {selectedSurah ? (
        <SurahDetail surah={selectedSurah} />
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {surahList.length > 0 ? (
            surahList.map((surah) => (
              <div
                key={surah.nomor}
                className="border p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleClickSurah(surah.nomor)}
              >
                <h2 className="text-xl font-semibold">{surah.nama}</h2>
                <p className="font-semibold">{surah.nama_latin}</p>
                <p className="italic text-gray-600">{surah.arti}</p>
              </div>
            ))
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}
