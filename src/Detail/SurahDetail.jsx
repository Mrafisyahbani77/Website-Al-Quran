import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Components/Loader";
import { IoLocationSharp, IoVolumeHigh, IoPlay, IoPause, IoHome, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { FaListOl, FaQuran } from "react-icons/fa";
import Footer from "../Components/Footer";

export default function SurahDetail() {
  const { nomor } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [prevSurah, setPrevSurah] = useState(null);
  const [nextSurah, setNextSurah] = useState(null);
  const [selectedAyat, setSelectedAyat] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`https://quran-api.santrikoding.com/api/surah/${nomor}`)
      .then((response) => {
        const data = response.data;
        setSurah(data);
        setPrevSurah(data.surat_sebelumnya || null);
        setNextSurah(data.surat_selanjutnya || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching surah details:", error);
        setLoading(false);
      });
  }, [nomor]);

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours > 0 ? (hours < 10 ? "0" : "") + hours + ":" : ""}${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const numberToArabic = (number) => {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

    if (number < 1 || number > 500) {
      return number.toString();
    }

    let result = "";
    const digits = number.toString().split("");

    digits.forEach((digit) => {
      result += arabicNumerals[parseInt(digit, 10)];
    });

    return result;
  };

  const formatTransliteration = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  if (loading) {
    return <Spinner />;
  }

  if (!surah) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <FaQuran className="text-6xl mx-auto mb-4 text-yellow-400" />
          <h2 className="text-2xl font-bold">Surah tidak ditemukan</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-200 bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700"
            >
              <IoHome className="text-lg" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
            
            <div className="text-center text-white">
              <h1 className="text-lg sm:text-xl font-bold">{surah.nama_latin}</h1>
              <p className="text-sm text-slate-300 hidden sm:block">{surah.arti}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {prevSurah && (
                <Link
                  to={`/surah/${prevSurah.nomor}`}
                  className="p-2 text-white hover:text-yellow-400 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                  title={`Surah ${prevSurah.nama_latin}`}
                >
                  <IoChevronBackOutline className="text-lg" />
                </Link>
              )}
              {nextSurah && (
                <Link
                  to={`/surah/${nextSurah.nomor}`}
                  className="p-2 text-white hover:text-yellow-400 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                  title={`Surah ${nextSurah.nama_latin}`}
                >
                  <IoChevronForwardOutline className="text-lg" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Surah Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-slate-800/50 to-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-2 font-arabic">
                {surah.nama}
              </h2>
              <p className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-2">
                {surah.nama_latin}
              </p>
              <p className="text-lg text-slate-300 italic mb-6">{surah.arti}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-slate-300">
                <FaListOl className="text-yellow-400" />
                <span>Jumlah Ayat: <span className="font-semibold text-white">{surah.jumlah_ayat}</span></span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-300">
                <IoLocationSharp className="text-yellow-400" />
                <span>Tempat Turun: <span className="font-semibold text-white">{surah.tempat_turun}</span></span>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600">
              <div className="flex items-center gap-3 mb-3">
                <IoVolumeHigh className="text-yellow-400 text-xl" />
                <span className="text-white font-medium">Audio Surah</span>
              </div>
              
              <audio
                ref={audioRef}
                src={surah.audio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="hidden"
              />
              
              <div className="space-y-3">
                <input
                  type="range"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-700 rounded-full cursor-pointer appearance-none slider"
                  style={{
                    background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${(currentTime / duration) * 100 || 0}%, #374151 ${(currentTime / duration) * 100 || 0}%, #374151 100%)`
                  }}
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    {formatTime(currentTime)}
                  </span>
                  
                  <button
                    onClick={isPlaying ? pauseAudio : playAudio}
                    className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full transition-colors duration-200 shadow-lg"
                  >
                    {isPlaying ? (
                      <IoPause className="text-xl" />
                    ) : (
                      <IoPlay className="text-xl ml-1" />
                    )}
                  </button>
                  
                  <span className="text-slate-400 text-sm">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ayat List */}
        <div className="space-y-8">
          {surah.ayat &&
            surah.ayat.map((ayat, index) => (
              <div 
                key={ayat.id} 
                className={`bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:bg-slate-800/50 ${
                  selectedAyat === ayat.id 
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setSelectedAyat(selectedAyat === ayat.id ? null : ayat.id)}
              >
                {/* Arabic Text */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                      {ayat.nomor}
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-2xl sm:text-3xl md:text-4xl leading-loose text-white font-arabic mb-4 hover:text-yellow-100 transition-colors duration-200">
                      {ayat.ar}
                    </p>
                  </div>
                </div>

                {/* Transliteration */}
                <div className="mb-4 px-4">
                  <p className="text-yellow-300 text-right text-lg italic leading-relaxed">
                    {formatTransliteration(ayat.tr)}
                  </p>
                </div>

                {/* Indonesian Translation */}
                <div className="px-4">
                  <p className="text-slate-200 text-justify text-lg leading-relaxed">
                    {ayat.idn}
                  </p>
                </div>

                {/* Ayat Number Indicator */}
                <div className="text-center mt-4 pt-4 border-t border-slate-700">
                  <span className="text-sm text-slate-400">
                    Ayat {ayat.nomor} • {surah.nama_latin}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {prevSurah && (
              <Link
                to={`/surah/${prevSurah.nomor}`}
                className="w-full sm:w-auto bg-gradient-to-r from-slate-800 to-blue-800 hover:from-slate-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <IoChevronBackOutline />
                <span>Surah Sebelumnya</span>
                <span className="font-semibold">({prevSurah.nama_latin})</span>
              </Link>
            )}
            {nextSurah && (
              <Link
                to={`/surah/${nextSurah.nomor}`}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-800 to-slate-800 hover:from-blue-700 hover:to-slate-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Surah Selanjutnya</span>
                <span className="font-semibold">({nextSurah.nama_latin})</span>
                <IoChevronForwardOutline />
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .font-arabic {
          font-family: 'Amiri', 'Scheherazade New', 'Arabic Typesetting', serif;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}