import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [surahList, setSurahList] = useState([]);

  useEffect(() => {
    axios
      .get('https://quran-api.santrikoding.com/api/surah')
      .then((response) => {
        setSurahList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">List of Surah</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {surahList.length > 0 ? (
          surahList.map((surah) => (
            <div key={surah.nomor} className="border p-4 rounded-lg shadow-md">
              <span className='float-right'> <h2 className="text-xl font-semibold">{surah.nama}</h2></span>
              <p className="font-semibold">{surah.nama_latin}</p>
              <p className="italic text-gray-600">{surah.arti}</p>
              {/* <p className="mt-2">Jumlah Ayat: {surah.jumlah_ayat}</p>
              <p>Tempat Turun: {surah.tempat_turun}</p> */}
            </div>
          ))
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}
