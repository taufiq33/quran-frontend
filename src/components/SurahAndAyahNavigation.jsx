import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../context/app-context";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { scrollToElement } from "../utils/scrollUtils";

export default function SurahAndAyahNavigation({ surahData }) {
  const [selectedSurah, setSelectedSurah] = useState("");
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
    navigate(`/surah/${e.target.value}`);
  }

  const prevSurah = number > 1 ? parseInt(number) - 1 : null;
  const nextSurah = number < 114 ? parseInt(number) + 1 : null;

  if (listSurah.length == 0) return navigate("/surah");

  return (
    <>
      <div className="header fixed w-full right-0 left-0 top-0 z-10 bg-stone-100 shadow-xl rounded-xl grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4  mb-4 px-4 py-2 text-sm">
        <button
          className="border-1 border-stone-200  bg-white p-2 flex gap-2 justify-center items-center rounded-lg cursor-pointer order-3 md:order-1 justify-self-end md:justify-self-end max-w-[180px] hover:shadow-lg hover:bg-purple-300/40"
          onClick={() => {
            if (prevSurah) navigate(`/surah/${prevSurah}`);
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

        <select
          className=" order-1 md:order-2 justify-self-end  md:justify-self-end max-w-[180px] hover:shadow-lg text-purple-900 border-1 border-stone-200 font-bold bg-white p-1 rounded-lg "
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
          className=" justify-self-start  md:justify-self-auto max-w-[180px] hover:shadow-lg order-2 md:order-3 border-1 border-stone-200 bg-white p-1 rounded-lg "
        >
          <option value={0}>Lompat ke ayat</option>
          {surahData.ayat.map((item) => (
            <option key={item.nomorAyat} value={item.nomorAyat}>
              Ayat {item.nomorAyat}
            </option>
          ))}
        </select>
        <button
          className="order-4 border-1 border-stone-200  bg-white p-2 flex gap-2 justify-center items-center rounded-lg cursor-pointer justify-self-start  md:justify-self-auto max-w-[180px] hover:shadow-lg hover:bg-purple-300/40"
          onClick={() => {
            if (nextSurah) navigate(`/surah/${nextSurah}`);
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
    </>
  );
}
