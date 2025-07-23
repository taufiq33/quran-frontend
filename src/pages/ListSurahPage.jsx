import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import SideMenuIcon from "../assets/side-menu-icon.svg";
import SearchIcon from "../assets/search-line.svg";
import LastReadBanner from "../assets/last-read-banner.png";
import QuranSmall from "../assets/quran-small.svg";

import { appContext } from "../context/app-context";
import SurahItem from "../components/SurahItem";

import { getLastReadSurah, getUsername } from "../helper/local-storage-helper";
import LoadingIndicator from "../components/LoadingIndicator";
import AskUsername from "../components/AskUsername";
import Header from "../components/Header";
import { scrollToTop } from "../utils/scrollUtils";

export default function ListSurahPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const searchBarRef = useRef();
  const { listSurah, showModal } = useContext(appContext);

  const lastRead = getLastReadSurah();

  useEffect(() => {
    if (!getUsername()) {
      showModal(<AskUsername />);
    }
  }, [showModal]);

  useEffect(() => {
    scrollToTop("instant");
    let timeout = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 1000);
    return () => clearTimeout(delay);
  }, [keyword]);

  const filteredSurah = useMemo(() => {
    if (!debouncedKeyword) return listSurah;

    const cleanedKeyword = debouncedKeyword
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase();
    // const regex = new RegExp(cleanedKeyword, "i");

    return listSurah.filter((item) => {
      const cleanedNamaLatin = item.namaLatin
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase();
      return (
        item.nomor.toString() === debouncedKeyword.toString() ||
        // regex.test(cleanedNamaLatin)
        cleanedNamaLatin.includes(cleanedKeyword)
      );
    });
  }, [debouncedKeyword, listSurah]);

  function handleSearchIconClick() {
    searchBarRef.current.focus();
  }

  if (listSurah.length === 0) return <LoadingIndicator />;

  if (listSurah.length > 0)
    return (
      <>
        <div className="poppins-regular">
          <Header
            title="Aplikasi Al Quran"
            searchButton
            searchFnCallback={handleSearchIconClick}
          />

          {!keyword && (
            <div className="flex flex-col md:flex-row md:justify-evenly justify-center p-4 md:p-1 items-start md:items-center">
              <div className="welcome-banner flex flex-col mb-6 px-4 duration-300 ease-in sm:text-xl lg:text-2xl sm:text-center">
                <h3 className="text-stone-500 mb-1">Assalamualaikum</h3>
                <h2 className="text-stone-700 font-bold tracking-widest text-lg">
                  {getUsername() || ""}
                </h2>
              </div>

              <div
                className={`card-last-read saturate-75 rounded-xl h-[131px] bg-no-repeat py-4 px-6 md:mx-4  bg-cover text-white mb-2 shadow-xl  duration-300 ease-in w-full min-[480px]:max-w-[350px] cursor-pointer`}
                style={{ backgroundImage: `url(${LastReadBanner})` }}
                onClick={() =>
                  (window.location.href = lastRead
                    ? `/surah/${lastRead.surahNumber}/${lastRead.ayah}`
                    : "/surah/1/1")
                }
              >
                <div className="last-read flex gap-2 mb-4">
                  <img src={QuranSmall} alt="" />
                  <span className="text-sm">
                    {lastRead ? "Terakhir dibaca" : "Mulai baca Al Quran"}
                  </span>
                </div>
                <div className="last-surah-ayah">
                  <h4 className="font-bold text-lg">
                    {lastRead
                      ? listSurah[lastRead.surahNumber - 1].namaLatin
                      : "Al-Fatihah"}
                  </h4>
                  <p className="text-xs opacity-80">
                    Ayat No: {lastRead ? lastRead.ayah : "1"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="container-list-of-surah p-4">
            <div className="search-box p-1 ">
              <input
                className="shadow-lg border-1 w-full text-sm border-purple-600 rounded p-2 focus:border-purple-900"
                type="search"
                name=""
                ref={searchBarRef}
                id=""
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="cari nama/nomor surat..."
                autoComplete="off"
              />
            </div>

            <hr className="border border-stone-200 my-2" />

            <div className="list-surah md:grid md:grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-7">
              {filteredSurah.map((item) => (
                <Link
                  className="md:flex-1/3 lg:flex-1/4 flex-shrink-0"
                  to={`/surah/${item.nomor}`}
                  key={item.nomor}
                >
                  <SurahItem surahData={item} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
