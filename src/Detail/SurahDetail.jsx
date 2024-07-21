import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Components/Loader";
import { IoLocationSharp } from "react-icons/io5";
import { FaListOl } from "react-icons/fa";
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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component is rendered or updated

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
    return <div>Surah not found</div>;
  }

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/"
            className="hover:text-yellow-500 bg-black w-full text-center px-2 rounded-md hover:py-2 py-2 text-white-800"
          >
            Back Home
          </Link>
          <div className="items-center justify-center text-center cursor-pointer flex space-x-4 mt-10">
            {prevSurah && (
              <Link
                to={`/surah/${prevSurah.nomor}`}
                className="bg-black hover:text-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Surah Sebelumnya ({prevSurah.nama_latin})
              </Link>
            )}
            {nextSurah && (
              <Link
                to={`/surah/${nextSurah.nomor}`}
                className="bg-black hover:text-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Surah Selanjutnya ({nextSurah.nama_latin})
              </Link>
            )}
          </div>
          <div className="my-24">
            <h2 className="text-4xl font-bold text-center">{surah.nama}</h2>
            <p className="text-2xl font-semibold text-center">
              {surah.nama_latin}
            </p>
            <p className="italic text-gray-400 text-center">{surah.arti}</p>
            <p className="text-center flex items-center justify-center">
              <FaListOl className="mr-2" /> Jumlah Ayat: {surah.jumlah_ayat}
            </p>
            <p className="text-center flex items-center justify-center">
              <IoLocationSharp className="mr-2" /> Tempat Turun:{" "}
              {surah.tempat_turun}
            </p>

            <div className="text-center mt-4">
              <div className="flex flex-col items-center space-y-2 w-full">
                <audio
                  ref={audioRef}
                  src={surah.audio}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="hidden"
                ></audio>
                <input
                  type="range"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-700 rounded-full cursor-pointer appearance-none"
                />
                <div className="flex items-center justify-between w-full mt-2">
                  <span className="text-gray-400">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex space-x-4">
                    <button
                      onClick={playAudio}
                      className={`bg-gray-800 text-white p-2 rounded-full ${
                        isPlaying ? "hidden" : "block"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-6.586-3.68A1 1 0 007 8.138v7.724a1 1 0 001.166.98l6.586-3.68a1 1 0 000-1.74z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={pauseAudio}
                      className={`bg-gray-800 text-white p-2 rounded-full ${
                        isPlaying ? "block" : "hidden"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-gray-400">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            {surah.ayat &&
              surah.ayat.map((ayat) => (
                <div key={ayat.id} className="mt-40">
                  <p className="text-2xl flex justify-between items-center text-right">
                    <span className="text-left rounded-full px-2 bg-black mr-4">
                      {numberToArabic(ayat.nomor)}
                    </span>
                    <span>{ayat.ar}</span>
                  </p>
                  <p className="text-gray-400 text-right mt-3 mb-10">
                    {formatTransliteration(ayat.tr)}
                  </p>
                  <p className="text-gray-300 text-justify mb-5">{ayat.idn}</p>
                  <hr />
                </div>
              ))}
          </div>
          <div className="items-center justify-center text-center cursor-pointer flex space-x-4 mt-10">
            {prevSurah && (
              <Link
                to={`/surah/${prevSurah.nomor}`}
                className="bg-black hover:text-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Surah Sebelumnya ({prevSurah.nama_latin})
              </Link>
            )}
            {nextSurah && (
              <Link
                to={`/surah/${nextSurah.nomor}`}
                className="bg-black hover:text-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Surah Selanjutnya ({nextSurah.nama_latin})
              </Link>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
