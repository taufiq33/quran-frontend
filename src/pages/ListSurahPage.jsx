import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import SideMenuIcon from "../assets/side-menu-icon.svg";
import SearchIcon from "../assets/search-line.svg";
import LastReadBanner from "../assets/last-read-banner.png";
import QuranSmall from "../assets/quran-small.svg";

import { appContext } from "../context/app-context";
import SurahItem from "../components/SurahItem";
import BottomNavbar from "../components/BottomNavbar";

import { getLastReadSurah } from "../helper/local-storage-helper";
import LoadingIndicator from "../components/LoadingIndicator";

export default function ListSurahPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const searchBarRef = useRef();
  const { listSurah } = useContext(appContext);

  const lastRead = getLastReadSurah();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    let timeout = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 100);
    return () => clearTimeout(delay);
  }, [keyword]);

  const filteredSurah = useMemo(() => {
    if (!debouncedKeyword) return listSurah;

    const cleanedKeyword = debouncedKeyword
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase();
    const regex = new RegExp(cleanedKeyword, "i");

    return listSurah.filter((item) => {
      const cleanedNamaLatin = item.namaLatin
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase();
      return (
        item.nomor.toString() === debouncedKeyword.toString() ||
        regex.test(cleanedNamaLatin)
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
          <div className="header sticky top-0 z-100 bg-stone-50 shadow flex justify-between items-center gap-6 mb-4 px-4 py-2">
            <div className="flex gap-6">
              <img src={SideMenuIcon} alt="" className="" />
              <h1 className="text-purple-500 grayscale-50 font-bold text-lg ">
                Aplikasi Al Quran
              </h1>
            </div>
            <img
              src={SearchIcon}
              onClick={handleSearchIconClick}
              alt=""
              className=""
            />
          </div>

          {!keyword && (
            <>
              <div className="welcome-banner flex flex-col mb-6 px-4 duration-300 ease-in">
                <h3 className="text-stone-500 mb-1">Assalamualaikum</h3>
                <h2 className="text-stone-700 font-bold tracking-widest text-lg">
                  Taufiq Hidayat
                </h2>
              </div>

              {lastRead && (
                <div
                  className={`card-last-read saturate-75 rounded-xl h-[131px] bg-no-repeat py-4 px-6 mx-4  bg-cover text-white mb-2 shadow-xl  duration-300 ease-in`}
                  style={{ backgroundImage: `url(${LastReadBanner})` }}
                  onClick={() =>
                    (window.location.href = `/surah/${lastRead.surahNumber}/${lastRead.ayah}`)
                  }
                >
                  <div className="last-read flex gap-2 mb-4">
                    <img src={QuranSmall} alt="" />
                    <span className="text-sm">Terakhir dibaca</span>
                  </div>
                  <div className="last-surah-ayah">
                    <h4 className="font-bold text-lg">
                      {listSurah[lastRead.surahNumber - 1].namaLatin}
                    </h4>
                    <p className="text-xs opacity-80">
                      Ayat No: {lastRead.ayah}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="container-list-of-surah p-4">
            <div className="search-box p-1 ">
              <input
                className="shadow-lg border-1 w-full text-sm border-purple-900 rounded p-2"
                type="search"
                name=""
                ref={searchBarRef}
                id=""
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="cari nama/nomor surat..."
              />
            </div>

            <hr className="border border-stone-200 my-2" />

            <div className="list-surah">
              {filteredSurah.map((item) => (
                <Link to={`/surah/${item.nomor}`} key={item.nomor}>
                  <SurahItem surahData={item} />
                </Link>
              ))}
            </div>
          </div>

          <BottomNavbar />
        </div>
      </>
    );
}
