import { Route, Routes } from "react-router-dom";
import SurahList from "../List/SurahList";
import SurahDetail from "../Detail/SurahDetail";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<SurahList />} />
      <Route path="/surah/:nomor" element={<SurahDetail />} />
    </Routes>
  );
}
