import QuranMenuIcon from "../assets/quran-menu-icon.svg";
import SholatIcon from "../assets/sholat-icon.svg";
import BookmarkIcon from "../assets/bookmark-icon.svg";
import SettingsIcon from "../assets/settings_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuran } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { getLastReadSurah } from "../helper/local-storage-helper";

const genericClass =
  "flex flex-col lg:flex-row gap-2 justify-center items-center";

export default function BottomNavbar() {
  let lastReadSurah = getLastReadSurah() || { surahNumber: 1, ayah: 1 };
  return (
    <>
      <div className="header fixed w-full bottom-0 z-100 bg-stone-50 shadow-[0_-1px_3px_0_rgba(0,0,0,0.1),0_-4px_12px_-4px_rgba(0,0,0,0.1)] flex justify-evenly items-center p-2 border-t-stone-100 border-t-1 right-0 left-0">
        <NavLink
          className={({ isActive }) =>
            `${genericClass}  md:pt-1 ${
              isActive ? "active" : "grey-custom-filter"
            }`
          }
          to={`/list-surah`}
        >
          <FontAwesomeIcon icon={faQuran} className="scale-130 mr-2" />
          <span className="hidden md:block pt-2 lg:pt-0">Daftar Surat</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${genericClass} ${isActive ? "active" : null}`
          }
          to={`/sholat`}
        >
          <img className="scale-80" src={SholatIcon} alt="" />
          <span className="hidden md:block">Jadwal Sholat</span>
        </NavLink>
        <NavLink
          className={() =>
            `${genericClass} ${
              location.pathname.startsWith("/surah/") ? "active" : null
            }`
          }
          to={`/surah/${lastReadSurah.surahNumber}/${lastReadSurah.ayah}`}
        >
          <img className="scale-80" src={QuranMenuIcon} alt="" />
          <span className="hidden md:block">
            {location.pathname.startsWith("/surah/")
              ? "Baca Quran"
              : "Terakhir dibaca"}
          </span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${genericClass} ${isActive ? "active" : null}`
          }
          to={`/bookmark`}
        >
          <img className="scale-80" src={BookmarkIcon} alt="" />
          <span className="hidden md:block">Bookmark</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${genericClass} ${isActive ? "active" : null}`
          }
          to={`/settings`}
        >
          <img className="scale-70 opacity-55" src={SettingsIcon} alt="" />
          <span className="hidden md:block">Pengaturan</span>
        </NavLink>
      </div>
    </>
  );
}
