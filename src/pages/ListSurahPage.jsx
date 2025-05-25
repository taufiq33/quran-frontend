import { useState, useEffect } from "react";

import SideMenuIcon from "../assets/side-menu-icon.svg";
import SearchIcon from "../assets/search-line.svg";
import LastReadBanner from "../assets/last-read-banner.png";
import QuranSmall from "../assets/quran-small.svg";

import SurahItem from "../components/SurahItem";
import BottomNavbar from "../components/BottomNavbar";

export default function ListSurahPage() {
  const [listSurah, setListSurah] = useState([]);

  useEffect(() => {
    async function getListSurah() {
      const url = "http://192.168.43.216:3000/surah";
      const request = await fetch(url);
      const response = await request.json();
      setListSurah(response.data);
    }

    getListSurah();
  }, []);

  return (
    <>
      <div className="poppins-regular">
        <div className="header sticky top-0 z-100 bg-stone-50 shadow flex justify-between items-center gap-6 mb-4 px-4 py-2">
          <div className="flex gap-6">
            <img src={SideMenuIcon} alt="" className="" />
            <h1 className="text-purple-500 grayscale-50 font-bold text-lg ">
              Quran App
            </h1>
          </div>
          <img src={SearchIcon} alt="" className="" />
        </div>

        <div className="welcome-banner flex flex-col mb-6 px-4">
          <h3 className="text-stone-500 mb-1">Assalamualaikum</h3>
          <h2 className="text-stone-700 font-bold tracking-widest text-lg">
            Taufiq Hidayat
          </h2>
        </div>

        <div
          className={`card-last-read saturate-75 rounded-xl h-[131px] bg-no-repeat py-4 px-6 mx-4  bg-cover text-white mb-2 shadow-xl`}
          style={{ backgroundImage: `url(${LastReadBanner})` }}
        >
          <div className="last-read flex gap-2 mb-4">
            <img src={QuranSmall} alt="" />
            <span className="text-sm">Last Read</span>
          </div>
          <div className="last-surah-ayah">
            <h4 className="font-bold text-lg">Al-Fatihah</h4>
            <p className="text-xs opacity-80">Ayah No: 1</p>
          </div>
        </div>

        <div className="container-list-of-surah p-4">
          <div className="search-box p-1">
            <input
              className="shadow-lg border-1 w-full text-sm border-purple-900 rounded p-2"
              type="text"
              name=""
              id=""
              placeholder="Search surah..."
            />
          </div>

          <hr className="border border-stone-200 my-2" />

          <div className="list-surah">
            {listSurah.map((item) => (
              <SurahItem key={item.number} surahData={item} />
            ))}
          </div>
        </div>

        <BottomNavbar />
      </div>
    </>
  );
}
