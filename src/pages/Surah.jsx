import { useEffect, useRef, Suspense, useContext } from "react";
import { useLoaderData, useParams, Await } from "react-router-dom";
import { appContext } from "../context/app-context";

import QuranAsset from "../assets/quran.png";

import AyahItem from "../components/AyahItem";

import SurahAndAyahNavigation from "../components/SurahAndAyahNavigation";

import { fetchSurah } from "../helper/data-fetcher-helper";
import LoadingIndicator from "../components/LoadingIndicator";
import { scrollToTop } from "../utils/scrollUtils";

export default function Surah() {
  const { data: surahData } = useLoaderData();
  const { number, ayah } = useParams();
  const audioRef = useRef();

  const { handleActiveAyahChange, activeAyah, settings } =
    useContext(appContext);

  if (number > 114) window.location.href = "/list-surah";

  useEffect(() => {
    handleActiveAyahChange(null, null);
  }, [handleActiveAyahChange]);

  useEffect(() => {
    let timeout = null;

    if (!ayah || ayah < 2) {
      scrollToTop();
      timeout = setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 1500);
    }

    if (audioRef.current) {
      audioRef.current.src = "";
    }

    return () => clearTimeout(timeout);
  }, [number, ayah]);

  async function ayahAudioPlayEvent(
    src,
    ayahObj,
    next = false,
    nextAudio = false
  ) {
    if (audioRef.current) {
      if (!next) {
        handleActiveAyahChange(ayahObj.ayahNumber, ayahObj.surahNumber);
        audioRef.current.src = src;
        audioRef.current.play();
      } else {
        handleActiveAyahChange(null, null, true);
        audioRef.current.src = nextAudio.audio[settings.qori];
        audioRef.current.load();
        audioRef.current.play();
      }
    }
  }

  function handleAyahPlayedEnded(event, loadedSurahData) {
    event.target.src = null;
    if (activeAyah.ayahNumber + 1 > loadedSurahData.ayat.length) {
      return handleActiveAyahChange(null, null);
    }
    const timeout = setTimeout(() => {
      ayahAudioPlayEvent(
        null,
        null,
        true,
        loadedSurahData.ayat[activeAyah.ayahNumber],
        loadedSurahData.ayat.length
      );
    }, 1000);
    return () => clearTimeout(timeout);
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Await resolve={surahData}>
        {(loadedSurahData) => (
          <div className="poppins-regular mb-40">
            <SurahAndAyahNavigation surahData={loadedSurahData} />

            <>
              <div className="surah-banner relative p-4 rounded-xl text-white flex flex-col gap-1 justify-center items-center m-6 shadow bg-cover bg-no-repeat mt-30 md:w-[512px] md:mx-auto bg-gradient-to-br from-[#DF98FA]/80 to-[#9055FF]/80 overflow-hidden">
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
                <img
                  src={QuranAsset}
                  alt=""
                  className="-z-10 absolute right-0 bottom-0 w-3/5 min-[420px]:w-2/5 h-auto"
                />
              </div>

              <div className="surah-ayah-container">
                {loadedSurahData.ayat.map((item) => (
                  <AyahItem
                    key={item.nomorAyat}
                    ayahData={item}
                    onPlayAudio={ayahAudioPlayEvent}
                    playStatus={item.nomorAyat === activeAyah.ayahNumber}
                  />
                ))}
              </div>

              <div className="fixed bottom-14 md:bottom-22 lg:bottom-14 left-0 right-0 mx-auto w-full px-3">
                <div className="max-w-xl mx-auto relative">
                  {activeAyah.ayahNumber && (
                    <div
                      className="text-xs text-white bg-purple-600/80 
                        rounded-t-lg px-3 py-2 font-medium -mb-1 inline-block"
                    >
                      {loadedSurahData.namaLatin} • Ayat {activeAyah.ayahNumber}
                    </div>
                  )}
                  <audio
                    className="w-full bg-purple-300/80 shadow-lg rounded-lg p-3 
                      border-2 border-purple-400

                      [&::-webkit-media-controls-current-time-display]:text-purple-900
                      [&::-webkit-media-controls-time-remaining-display]:text-purple-900
                      [&::-webkit-media-controls-timeline]:text-purple-200
                      [&::-webkit-media-controls-play-button]:text-white
                      [&::-webkit-media-controls-volume-slider]:accent-purple-200
                      [&::-webkit-media-controls-mute-button]:text-white
                      hover:bg-purple-400/80 transition-colors duration-300"
                    src={null}
                    ref={audioRef}
                    controls
                    onEnded={(event) => {
                      handleAyahPlayedEnded(event, loadedSurahData);
                    }}
                  />
                </div>
              </div>
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
