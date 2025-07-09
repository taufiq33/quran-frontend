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
          <div className="poppins-regular mb-30">
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

              <div className="fixed bottom-14 left-0 right-0 mx-auto w-full px-3">
                <div className="max-w-xl mx-auto relative">
                  {activeAyahPlayed && (
                    <div
                      className="text-xs text-white bg-purple-600/80 
                        rounded-t-lg px-3 py-2 font-medium -mb-1 inline-block"
                    >
                      {loadedSurahData.namaLatin} • Ayat {activeAyahPlayed}
                    </div>
                  )}
                  <audio
                    className="w-full bg-purple-200/80 shadow-lg rounded-lg p-3 
                      border-2 border-purple-400

                      [&::-webkit-media-controls-current-time-display]:text-purple-900
                      [&::-webkit-media-controls-time-remaining-display]:text-purple-900
                      [&::-webkit-media-controls-timeline]:text-purple-200
                      [&::-webkit-media-controls-play-button]:text-white
                      [&::-webkit-media-controls-volume-slider]:accent-purple-200
                      [&::-webkit-media-controls-mute-button]:text-white
                      hover:bg-purple-700 transition-colors duration-300"
                    src={null}
                    ref={audioRef}
                    controls
                    onEnded={(event) => {
                      event.target.src = null;
                      setActiveAyahPlayed(null);
                    }}
                  />
                </div>
              </div>
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
