import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaListOl, FaPlay } from "react-icons/fa";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Icon2 from "../assets/icon2.jpeg";

export default function SurahList() {
  const [surahList, setSurahList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredSurah, setHoveredSurah] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchSurahList = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://quran-api.santrikoding.com/api/surah",
          { timeout: 10000 }
        );

        if (isMounted) {
          setSurahList(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        if (isMounted) {
          setError(error.message || "Gagal memuat data");
          setLoading(false);
        }
      }
    };

    fetchSurahList();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClickSurah = useCallback(
    (surahNomor) => {
      navigate(`/surah/${surahNomor}`);
    },
    [navigate]
  );

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const filteredSurahList = useMemo(() => {
    if (!searchQuery) return surahList;

    return surahList.filter(
      (surah) =>
        surah.nama_latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.arti.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [surahList, searchQuery]);

  const numberToArabic = useCallback((number) => {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number
      .toString()
      .split("")
      .map((digit) => arabicNumerals[parseInt(digit, 10)])
      .join("");
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EADCC8] via-[#F5E6D3] to-[#E8D4BF] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="w-20 h-20 border-4 border-[#F4C542] border-t-transparent rounded-full animate-spin"></div>
            <img
              src={Icon2}
              alt="Al-Quran Icon"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <p className="text-[#1B4332] text-lg font-semibold">Memuat Daftar Surah...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EADCC8] via-[#F5E6D3] to-[#E8D4BF]">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-[#1B4332] mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-[#5A3825] max-w-md mx-auto mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#1B4332] to-[#2D5F4D] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Muat Ulang
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EADCC8] via-[#F5E6D3] to-[#E8D4BF]">
      <Navbar />

      <div id="list-alquran" className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332]">
              Daftar Surah Al-Quran
            </h1>
          </div>
          <p className="text-[#5A3825] text-lg max-w-2xl mx-auto leading-relaxed">
            Jelajahi 114 surah dalam Al-Quran dengan terjemahan dan audio yang
            mudah diakses
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#F4C542] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-[#1B4332]">
                {surahList.length}
              </div>
              <div className="text-[#5A3825] text-sm font-medium">Total Surah</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#F4C542] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-[#1B4332]">6,236</div>
              <div className="text-[#5A3825] text-sm font-medium">Total Ayat</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#F4C542] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-[#1B4332]">30</div>
              <div className="text-[#5A3825] text-sm font-medium">Juz/Para</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <IoSearchOutline className="text-[#5A3825] text-xl" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-[#1B4332]/20 rounded-2xl text-[#1C1C1C] placeholder-[#5A3825]/60 focus:outline-none focus:ring-2 focus:ring-[#F4C542] focus:border-[#F4C542] transition-all duration-200 shadow-md"
              placeholder="Cari surah... (contoh: Al-Fatihah, Pembuka)"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button
                  onClick={handleClearSearch}
                  className="text-[#5A3825] hover:text-[#C84B31] transition-colors duration-200 font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {searchQuery && (
            <div className="text-center mt-4">
              <p className="text-[#5A3825]">
                Ditemukan{" "}
                <span className="font-semibold text-[#1B4332]">
                  {filteredSurahList.length}
                </span>{" "}
                surah untuk pencarian "
                <span className="text-[#C84B31] font-medium">{searchQuery}</span>"
              </p>
            </div>
          )}
        </div>

        {/* Surah List */}
        <div className="mb-12">
          {filteredSurahList.length > 0 ? (
            <div className="grid gap-5 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredSurahList.map((surah) => (
                <div
                  key={surah.nomor}
                  className="group relative bg-white/80 backdrop-blur-sm border-2 border-[#1B4332]/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white hover:border-[#F4C542] hover:shadow-2xl hover:shadow-[#F4C542]/30 hover:-translate-y-2"
                  onClick={() => handleClickSurah(surah.nomor)}
                  onMouseEnter={() => setHoveredSurah(surah.nomor)}
                  onMouseLeave={() => setHoveredSurah(null)}
                >
                  {/* Header with Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#1B4332] to-[#2D5F4D] rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                        <span className="font-bold text-[#F4C542] text-lg">
                          {surah.nomor}
                        </span>
                      </div>
                      {hoveredSurah === surah.nomor && (
                        <div className="absolute -top-2 -right-2 bg-[#F4C542] text-[#1B4332] rounded-full p-1.5 animate-pulse">
                          <FaPlay className="text-xs" />
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-[#1B4332] mb-1 font-arabic">
                        {surah.nama}
                      </div>
                      <div className="text-[#F4C542] text-sm font-semibold">
                        {numberToArabic(surah.nomor)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-[#1B4332] group-hover:text-[#C84B31] transition-colors duration-200">
                        {surah.nama_latin}
                      </h3>
                      <p className="text-[#5A3825] italic text-sm">
                        {surah.arti}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-[#1B4332]/10">
                      <div className="flex items-center gap-2 text-[#5A3825] text-sm font-medium">
                        <FaListOl className="text-[#F4C542]" />
                        <span>{surah.jumlah_ayat} Ayat</span>
                      </div>

                      <div className="flex items-center gap-2 text-[#5A3825] text-sm font-medium">
                        <IoLocationSharp className="text-[#C84B31]" />
                        <span>{surah.tempat_turun}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F4C542]/5 to-[#1B4332]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-2xl">
              <div className="mb-6">
                <FaSearch className="text-6xl text-[#5A3825]/40 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#1B4332] mb-2">
                  Surah Tidak Ditemukan
                </h3>
                <p className="text-[#5A3825] max-w-md mx-auto">
                  Tidak ada surah yang sesuai dengan pencarian "{searchQuery}".
                  Coba gunakan kata kunci lain.
                </p>
              </div>
              <button
                onClick={handleClearSearch}
                className="bg-gradient-to-r from-[#1B4332] to-[#2D5F4D] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Tampilkan Semua Surah
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}