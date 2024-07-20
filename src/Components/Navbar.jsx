export default function Navbar({ surah = [], handleClickSurah }) {
  return (
    <nav className="bg-gray-800 p-10">
      <div className="container mx-auto">
        <ul className="flex space-x-4 overflow-x-auto">
          {Array.isArray(surah) && surah.map((surah) => (
            <li key={surah.nomor}>
              <button
                onClick={() => handleClickSurah(surah.nomor)}
                className="text-white py-2 px-5"
              >
                {surah.nama_latin}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
