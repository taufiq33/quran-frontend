import { useState, useEffect, useRef, Suspense } from "react";
import { useLoaderData, useParams, Await } from "react-router-dom";

import SurahBanner from "../assets/surah-banner.png";

import AyahItem from "../components/AyahItem";
import BottomNavbar from "../components/BottomNavbar";
import SurahAndAyahNavigation from "../components/SurahAndAyahNavigation";

import { fetchSurah } from "../helper/data-fetcher-helper";
import LoadingIndicator from "../components/LoadingIndicator";

export default function Surah() {
  const { data: surahData } = useLoaderData();
  const [activeAyahPlayed, setActiveAyahPlayed] = useState(null);
  const { number, ayah } = useParams();
  const audioRef = useRef();

  if (number > 114) window.location.href = "/list-surah";

  useEffect(() => {
    let timeout = null;

    if (!ayah || ayah < 2) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      timeout = setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 1500);
    }

    if (audioRef.current) {
      audioRef.current.src = "";
      setActiveAyahPlayed(null);
    }

    return () => clearTimeout(timeout);
  }, [number, ayah]);

  function ayahAudioPlayEvent(src, ayah) {
    if (audioRef.current) {
      setActiveAyahPlayed(ayah);
      audioRef.current.src = src;
      audioRef.current.play();
    }
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Await resolve={surahData}>
        {(loadedSurahData) => (
          <div className="poppins-regular">
            <SurahAndAyahNavigation surahData={loadedSurahData} />

            <>
              <div
                className="surah-banner p-4 rounded-xl text-white flex flex-col gap-1 justify-center items-center m-6 shadow bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${SurahBanner})` }}
              >
                <h1 className="text-2xl my-2">{loadedSurahData.namaLatin}</h1>
                <h2 className="text-sm">{loadedSurahData.arti}</h2>
                <hr className="my-4 border-1 border-stone-50 w-1/2 opacity-50" />
                <div className="flex gap-1 justify-evenly">
                  <h2>{loadedSurahData.tempatTurun}, </h2>
                  <h2>{loadedSurahData.jumlahAyat} Ayat</h2>
                </div>
                <div className="text-3xl my-4">
                  <h1 className="arabic">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </h1>
                </div>
              </div>

              <div className="surah-ayah-container">
                {loadedSurahData.ayat.map((item) => (
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
            </>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export async function loader({ params }) {
  return {
    data: fetchSurah(params.number),
  };
}
