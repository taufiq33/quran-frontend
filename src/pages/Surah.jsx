import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import SurahBanner from "../assets/surah-banner.png";

import AyahItem from "../components/AyahItem";
import BottomNavbar from "../components/BottomNavbar";
import SurahAndAyahNavigation from "../components/SurahAndAyahNavigation";

import {
  getLocalStorageSurahData,
  saveToLocalStorageSurahData,
  checkExistingSurahData,
} from "../helper/local-storage-helper";

export default function Surah() {
  const [surahData, setSurahData] = useState(null);
  const [activeAyahPlayed, setActiveAyahPlayed] = useState(null);
  const { number } = useParams();
  const audioRef = useRef();

  useEffect(() => {
    async function getSurahData() {
      const url = `https://equran.id/api/v2/surat/${number}`;
      const request = await fetch(url);
      const response = await request.json();
      setSurahData(response.data);
      saveToLocalStorageSurahData(number, response.data);
    }

    if (checkExistingSurahData(number)) {
      setSurahData(getLocalStorageSurahData(number));
    } else {
      getSurahData();
    }

    // getSurahData();
    window.scrollTo({ top: 0, behavior: "smooth" });

    let timeout = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 1500);

    if (audioRef.current) {
      audioRef.current.src = "";
      setActiveAyahPlayed(null);
    }

    return () => clearTimeout(timeout);
  }, [number]);

  function ayahAudioPlayEvent(src, ayah) {
    if (audioRef.current) {
      setActiveAyahPlayed(ayah);
      audioRef.current.src = src;
      audioRef.current.play();
    }
  }

  return (
    <>
      {surahData && (
        <div className="poppins-regular">
          {surahData && <SurahAndAyahNavigation surahData={surahData} />}

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
              <AyahItem
                key={item.nomorAyat}
                ayahData={item}
                onPlayAudio={ayahAudioPlayEvent}
                playStatus={item.nomorAyat === activeAyahPlayed}
              />
            ))}
          </div>

          <audio
            className="sticky bottom-14 w-full p-1 scale-95"
            src={null}
            ref={audioRef}
            controls
            onEnded={(event) => {
              event.target.src = null;
              setActiveAyahPlayed(null);
            }}
          ></audio>

          <BottomNavbar />
        </div>
      )}
    </>
  );
}
