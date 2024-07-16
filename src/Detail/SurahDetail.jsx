import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';

export default function SurahDetail({ surah }) {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(surah);

  useEffect(() => {
    axios
      .get('https://quran-api.santrikoding.com/api/surah')
      .then((response) => {
        setSurahList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching surah list:', error);
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
    <div className="bg-gray-900 text-white min-h-screen pl-16 md:pl-64">
      <Navbar surahList={surahList} handleClickSurah={handleClickSurah} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">{selectedSurah.nama}</h2>
        <span className='float-right'>
        <audio key={selectedSurah.audio} controls className="mt-4">
          <source src={selectedSurah.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        </span>
        <p className="font-semibold">{selectedSurah.nama_latin}</p>
        <p className="italic text-gray-400">{selectedSurah.arti}</p>
        <p>Jumlah Ayat: {selectedSurah.jumlah_ayat}</p>
        <p>Tempat Turun: {selectedSurah.tempat_turun}</p>
        <p className="mt-4" dangerouslySetInnerHTML={{ __html: selectedSurah.deskripsi }}></p>
      </div>
    </div>
  );
}
