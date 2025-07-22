import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../context/app-context";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { scrollToElement } from "../utils/scrollUtils";

export default function SurahAndAyahNavigation({ surahData }) {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedAyah, setSelectedAyah] = useState(0);
  const { listSurah, activeAyah } = useContext(appContext);
  const { number, ayah } = useParams();
  const navigate = useNavigate();

  const handleSelectAyah = useCallback(
    (ayahNumber) => {
      if (ayahNumber <= surahData.jumlahAyat) {
        scrollToElement(ayahNumber);
        setSelectedAyah(ayahNumber);
      }
    },
    [surahData.jumlahAyat]
  );

  useEffect(() => {
    setSelectedSurah(number);
    if (ayah > 1) {
      handleSelectAyah(ayah);
    } else {
      setSelectedAyah(0);
    }
  }, [number, ayah, handleSelectAyah]);

  useEffect(() => {
    activeAyah.ayahNumber !== null && handleSelectAyah(activeAyah.ayahNumber);
  }, [activeAyah.ayahNumber, handleSelectAyah]);

  function handleSelectSurah(e) {
    setSelectedSurah(e.target.value);
    window.location.href = `/surah/${e.target.value}`;
  }

  const prevSurah = number > 1 ? parseInt(number) - 1 : null;
  const nextSurah = number < 114 ? parseInt(number) + 1 : null;

  if (listSurah.length == 0) return navigate("/surah");

  return (
    <>
      <div className="header fixed w-full right-0 left-0 top-0 z-10 bg-stone-100 shadow-lg rounded-xl flex flex-col justify-around items-center gap-2 mb-4 px-4 py-2 text-sm opcity-50">
        <div className="flex gap-2 justify-around items-center">
          <select
            className="text-purple-900 border-1 border-stone-200 font-bold bg-white p-1 rounded-lg "
            name=""
            id=""
            value={selectedSurah}
            onChange={handleSelectSurah}
          >
            {listSurah.map((item) => {
              return (
                <option
                  className={
                    item.nomor == number
                      ? "bg-purple-900 text-white font-bold"
                      : "font-normal text-black"
                  }
                  value={item.nomor}
                  key={item.nomor}
                >
                  {item.nomor}. {item.namaLatin}
                </option>
              );
            })}
          </select>
          <select
            value={selectedAyah}
            onChange={(e) => handleSelectAyah(e.target.value)}
            className=" border-1 border-stone-200 bg-white p-1 rounded-lg "
          >
            <option value={0}>Lompat ke ayat</option>
            {surahData.ayat.map((item) => (
              <option key={item.nomorAyat} value={item.nomorAyat}>
                Ayat {item.nomorAyat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-6 justify-around items-center">
          <button
            className="border-1 border-stone-200  bg-white p-2 flex gap-2 justify-center items-center rounded-lg cursor-pointer "
            onClick={() => {
              if (prevSurah) window.location.href = `/surah/${prevSurah}`;
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {!prevSurah && <span>---</span>}
            {prevSurah && (
              <span>
                {prevSurah}. {listSurah[prevSurah - 1].namaLatin}
              </span>
            )}
          </button>

          <button
            className="border-1 border-stone-200  bg-white p-2 flex gap-2 justify-center items-center rounded-lg cursor-pointer "
            onClick={() => {
              if (nextSurah) window.location.href = `/surah/${nextSurah}`;
            }}
          >
            {!nextSurah && <span>---</span>}
            {nextSurah && (
              <span>
                {nextSurah}. {listSurah[nextSurah - 1].namaLatin}
              </span>
            )}
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
}
