import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaQuran,
  FaListOl,
  FaBookOpen,
  FaPlay,
} from "react-icons/fa";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Icon2 from "../assets/icon2.jpeg";

export default function SurahList() {
  const [surahList, setSurahList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredSurah, setHoveredSurah] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://quran-api.santrikoding.com/api/surah")
      .then((response) => {
        setSurahList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleClickSurah = (surahNomor) => {
    navigate(`/surah/${surahNomor}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSurahList = surahList.filter(
    (surah) =>
      surah.nama_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.arti.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const numberToArabic = (number) => {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    let result = "";
    const digits = number.toString().split("");
    digits.forEach((digit) => {
      result += arabicNumerals[parseInt(digit, 10)];
    });
    return result;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <img src={Icon2} alt="Al-Quran Icon" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl w-8 h-8" />
          </div>
          <p className="text-white text-lg">Memuat Daftar Surah...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            {/* <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full">
              <FaQuran className="text-2xl text-slate-900" />
            </div> */}
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Daftar Surah Al-Quran
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Jelajahi 114 surah dalam Al-Quran dengan terjemahan dan audio yang
            mudah diakses
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-yellow-400">
                {surahList.length}
              </div>
              <div className="text-slate-300 text-sm">Total Surah</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-yellow-400">6,236</div>
              <div className="text-slate-300 text-sm">Total Ayat</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-yellow-400">30</div>
              <div className="text-slate-300 text-sm">Juz/Para</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <IoSearchOutline className="text-slate-400 text-xl" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
              placeholder="Cari surah... (contoh: Al-Fatihah, Pembuka)"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {searchQuery && (
            <div className="text-center mt-4">
              <p className="text-slate-300">
                Ditemukan{" "}
                <span className="font-semibold text-yellow-400">
                  {filteredSurahList.length}
                </span>{" "}
                surah untuk pencarian "
                <span className="text-yellow-400">{searchQuery}</span>"
              </p>
            </div>
          )}
        </div>

        {/* Surah List */}
        <div className="mb-12">
          {filteredSurahList.length > 0 ? (
            <div className="grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredSurahList.map((surah, index) => (
                <div
                  key={surah.nomor}
                  className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-slate-800/50 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1"
                  onClick={() => handleClickSurah(surah.nomor)}
                  onMouseEnter={() => setHoveredSurah(surah.nomor)}
                  onMouseLeave={() => setHoveredSurah(null)}
                >
                  {/* Header with Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                        <span className="font-bold text-slate-900 text-lg">
                          {surah.nomor}
                        </span>
                      </div>
                      {hoveredSurah === surah.nomor && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 rounded-full p-1">
                          <FaPlay className="text-xs" />
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1 font-arabic">
                        {surah.nama}
                      </div>
                      <div className="text-yellow-400 text-sm">
                        {numberToArabic(surah.nomor)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-200">
                        {surah.nama_latin}
                      </h3>
                      <p className="text-slate-400 italic text-sm">
                        {surah.arti}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <FaListOl className="text-yellow-400" />
                        <span>{surah.jumlah_ayat} Ayat</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <IoLocationSharp className="text-yellow-400" />
                        <span>{surah.tempat_turun}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6">
                <FaSearch className="text-6xl text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Surah Tidak Ditemukan
                </h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Tidak ada surah yang sesuai dengan pencarian "{searchQuery}".
                  Coba gunakan kata kunci lain.
                </p>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-colors duration-200"
              >
                Tampilkan Semua Surah
              </button>
            </div>
          )}
        </div>

        {/* Quick Navigation */}
        {/* {filteredSurahList.length > 0 && (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Navigasi Cepat
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById(`surah-1`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                🏠 Al-Fatihah
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById(`surah-2`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                📖 Al-Baqarah
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById(`surah-18`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                🏞️ Al-Kahf
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById(`surah-36`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                💖 Yasin
              </button>
            </div>
          </div>
        )} */}
      </div>

      <Footer />

      <style jsx>{`
        .font-arabic {
          font-family: "Amiri", "Scheherazade New", "Arabic Typesetting", serif;
        }
      `}</style>
    </div>
  );
}
