import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SurahDetail() {
  const { id } = useParams(); // Ubah dari nomor menjadi id
  const [surah, setSurah] = useState(null);

  useEffect(() => {
    axios
      .get(`https://quran-api.santrikoding.com/api/surah?id=${id}`) // Ganti endpoint sesuai dengan API Anda
      .then((response) => {
        setSurah(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching surah details for surah ID ${id}:`, error);
        if (error.response && error.response.status === 404) {
          console.log('Surah not found.');
          // Handle case where surah is not found, e.g., redirect or display a message
        } else {
          console.log('An error occurred while fetching surah details.');
          // Handle other types of errors
        }
      });
  }, [id]);

  if (!surah) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{surah.nama}</h2>
      <p className="font-semibold">{surah.nama_latin}</p>
      <p className="italic text-gray-600">{surah.arti}</p>
      <p>Jumlah Ayat: {surah.jumlah_ayat}</p>
      <p>Tempat Turun: {surah.tempat_turun}</p>
      <p className="mt-4" dangerouslySetInnerHTML={{ __html: surah.deskripsi }}></p>
      <audio controls className="mt-4">
        <source src={surah.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
