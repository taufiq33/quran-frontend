import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SurahBanner from "../assets/surah-banner.png";

import AyahItem from "../components/AyahItem";
import BottomNavbar from "../components/BottomNavbar";

export default function Surah() {
  const [surahData, setSurahData] = useState(null);
  const { number } = useParams();

  useEffect(() => {
    async function getSurahData() {
      const url = `https://equran.id/api/v2/surat/${number}`;
      const request = await fetch(url);
      const response = await request.json();
      setSurahData(response.data);
    }

    getSurahData();
  }, []);

  return (
    <>
      {surahData && (
        <div className="poppins-regular">
          <div className="header sticky top-0 z-100 bg-stone-50 shadow flex justify-between items-center gap-6 mb-4 px-4 py-2">
            <div className="flex gap-6">
              <h1 className="text-purple-500 grayscale-50 font-bold text-lg ">
                {surahData.namaLatin}
              </h1>
            </div>
          </div>

          <div
            className="surah-banner p-4 rounded-xl text-white flex flex-col gap-1 justify-center items-center m-6 shadow bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${SurahBanner})` }}
          >
            <h1 className="text-2xl my-2">{surahData.namaLatin}</h1>
            <h2 className="text-sm">{surahData.arti}</h2>
            <hr className="my-4 border-1 border-stone-50 w-1/2 opacity-50" />
            <div className="flex gap-1 justify-evenly">
              <h2>{surahData.tempatTurun}, </h2>
              <h2>{surahData.jumlahAyat} Ayat</h2>
            </div>
            <div className="text-3xl my-4">
              <h1 className="arabic">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
            </div>
          </div>

          <div className="surah-ayah-container">
            {surahData.ayat.map((item) => (
              <AyahItem key={item.nomor} ayahData={item} />
            ))}
          </div>

          <BottomNavbar />
        </div>
      )}
    </>
  );
}
