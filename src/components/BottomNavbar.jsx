import QuranMenuIcon from "../assets/quran-menu-icon.svg";
import SholatIcon from "../assets/sholat-icon.svg";
import BookmarkIcon from "../assets/bookmark-icon.svg";
import SettingsIcon from "../assets/settings_icon.png";
import { NavLink } from "react-router-dom";

export default function BottomNavbar() {
  return (
    <>
      <div className="header fixed w-full bottom-0 z-100 bg-stone-50 shadow-lg flex justify-evenly items-center gap-1 px-4 py-2 border-t-stone-100 border-t-1">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : null)}
          to={`/surah`}
        >
          <img className="scale-80" src={QuranMenuIcon} alt="" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : null)}
          to={`/sholat`}
        >
          <img className="scale-80" src={SholatIcon} alt="" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : null)}
          to={`/bookmark`}
        >
          <img className="scale-80" src={BookmarkIcon} alt="" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : null)}
          to={`/settings`}
        >
          <img className="scale-70 opacity-55" src={SettingsIcon} alt="" />
        </NavLink>
      </div>
    </>
  );
}
