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
      <div className="min-h-screen bg-gradient-to-br from-[#EADCC8] via-[#F5E6D3] to-[#E8D4BF] flex items-center justify-center">
        <div className="text-center">
          <FaQuran className="text-6xl mx-auto mb-4 text-[#C84B31]" />
          <h2 className="text-2xl font-bold text-[#1B4332]">Surah tidak ditemukan</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EADCC8] via-[#F5E6D3] to-[#E8D4BF]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b-4 border-[#F4C542] shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#1B4332] hover:text-[#F4C542] transition-all duration-300 bg-[#EADCC8] px-4 py-2 rounded-xl hover:bg-[#F4C542] hover:text-[#1B4332] font-semibold shadow-md hover:shadow-lg hover:scale-105"
            >
              <IoHome className="text-lg" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
            
            <div className="text-center text-[#1B4332]">
              <h1 className="text-lg sm:text-xl font-bold">{surah.nama_latin}</h1>
              <p className="text-sm text-[#5A3825] hidden sm:block italic">{surah.arti}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {prevSurah && (
                <Link
                  to={`/surah/${prevSurah.nomor}`}
                  className="p-2 text-[#1B4332] hover:text-white bg-[#EADCC8] rounded-xl hover:bg-[#1B4332] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                  title={`Surah ${prevSurah.nama_latin}`}
                >
                  <IoChevronBackOutline className="text-lg" />
                </Link>
              )}
              {nextSurah && (
                <Link
                  to={`/surah/${nextSurah.nomor}`}
                  className="p-2 text-[#1B4332] hover:text-white bg-[#EADCC8] rounded-xl hover:bg-[#1B4332] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
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
          <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-lg rounded-3xl p-8 border-4 border-[#F4C542] shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4C542]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#1B4332]/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 mb-6">
              <h2 className="text-5xl sm:text-6xl font-bold text-[#1B4332] mb-3 font-arabic">
                {surah.nama}
              </h2>
              <p className="text-2xl sm:text-3xl font-semibold text-[#F4C542] mb-2">
                {surah.nama_latin}
              </p>
              <p className="text-lg text-[#5A3825] italic mb-6">{surah.arti}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center justify-center gap-3 text-[#5A3825] bg-[#EADCC8]/50 rounded-xl p-3">
                <FaListOl className="text-[#F4C542] text-xl" />
                <span className="font-medium">Jumlah Ayat: <span className="font-bold text-[#1B4332]">{surah.jumlah_ayat}</span></span>
              </div>
              <div className="flex items-center justify-center gap-3 text-[#5A3825] bg-[#EADCC8]/50 rounded-xl p-3">
                <IoLocationSharp className="text-[#C84B31] text-xl" />
                <span className="font-medium">Tempat Turun: <span className="font-bold text-[#1B4332]">{surah.tempat_turun}</span></span>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-white/80 rounded-2xl p-5 border-2 border-[#1B4332]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#F4C542] to-[#C84B31] p-2 rounded-xl">
                  <IoVolumeHigh className="text-white text-xl" />
                </div>
                <span className="text-[#1B4332] font-bold text-lg">Audio Surah</span>
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
                  className="w-full h-3 bg-[#EADCC8] rounded-full cursor-pointer appearance-none slider"
                  style={{
                    background: `linear-gradient(to right, #F4C542 0%, #F4C542 ${(currentTime / duration) * 100 || 0}%, #EADCC8 ${(currentTime / duration) * 100 || 0}%, #EADCC8 100%)`
                  }}
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-[#5A3825] text-sm font-semibold bg-[#EADCC8] px-3 py-1 rounded-lg">
                    {formatTime(currentTime)}
                  </span>
                  
                  <button
                    onClick={isPlaying ? pauseAudio : playAudio}
                    className="bg-gradient-to-br from-[#F4C542] to-[#C84B31] hover:from-[#C84B31] hover:to-[#F4C542] text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                  >
                    {isPlaying ? (
                      <IoPause className="text-2xl" />
                    ) : (
                      <IoPlay className="text-2xl ml-1" />
                    )}
                  </button>
                  
                  <span className="text-[#5A3825] text-sm font-semibold bg-[#EADCC8] px-3 py-1 rounded-lg">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ayat List */}
        <div className="space-y-6">
          {surah.ayat &&
            surah.ayat.map((ayat, index) => (
              <div 
                key={ayat.id} 
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                  selectedAyat === ayat.id 
                    ? 'border-[#F4C542] shadow-xl shadow-[#F4C542]/30 scale-[1.02]' 
                    : 'border-[#1B4332]/10 hover:border-[#F4C542]/50'
                }`}
                onClick={() => setSelectedAyat(selectedAyat === ayat.id ? null : ayat.id)}
              >
                {/* Arabic Text */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1B4332] to-[#2D5F4D] rounded-xl flex items-center justify-center text-[#F4C542] font-bold text-base shadow-lg">
                      {ayat.nomor}
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-2xl sm:text-3xl md:text-4xl leading-loose text-[#1B4332] font-arabic mb-4 hover:text-[#2D5F4D] transition-colors duration-200">
                      {ayat.ar}
                    </p>
                  </div>
                </div>

                {/* Transliteration */}
                <div className="mb-4 px-4 py-3 bg-[#FFF8E7] rounded-xl border-l-4 border-[#F4C542]">
                  <p className="text-[#5A3825] text-right text-base sm:text-lg italic leading-relaxed font-medium">
                    {formatTransliteration(ayat.tr)}
                  </p>
                </div>

                {/* Indonesian Translation */}
                <div className="px-4 py-3 bg-[#EADCC8]/30 rounded-xl">
                  <p className="text-[#1C1C1C] text-justify text-base sm:text-lg leading-relaxed">
                    {ayat.idn}
                  </p>
                </div>

                {/* Ayat Number Indicator */}
                <div className="text-center mt-4 pt-4 border-t-2 border-[#1B4332]/10">
                  <span className="text-sm text-[#5A3825] font-medium bg-[#EADCC8]/50 px-4 py-2 rounded-full">
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
                className="w-full sm:w-auto bg-gradient-to-r from-[#1B4332] to-[#2D5F4D] hover:from-[#2D5F4D] hover:to-[#1B4332] text-[#EADCC8] px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 font-semibold"
              >
                <IoChevronBackOutline className="text-xl" />
                <div className="text-left">
                  <div className="text-xs text-[#F4C542]">Surah Sebelumnya</div>
                  <div className="text-base">{prevSurah.nama_latin}</div>
                </div>
              </Link>
            )}
            {nextSurah && (
              <Link
                to={`/surah/${nextSurah.nomor}`}
                className="w-full sm:w-auto bg-gradient-to-r from-[#2D5F4D] to-[#1B4332] hover:from-[#1B4332] hover:to-[#2D5F4D] text-[#EADCC8] px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 font-semibold"
              >
                <div className="text-right">
                  <div className="text-xs text-[#F4C542]">Surah Selanjutnya</div>
                  <div className="text-base">{nextSurah.nama_latin}</div>
                </div>
                <IoChevronForwardOutline className="text-xl" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}