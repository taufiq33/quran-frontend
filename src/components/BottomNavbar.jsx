import QuranMenuIcon from "../assets/quran-menu-icon.svg";
import SholatIcon from "../assets/sholat-icon.svg";
import BookmarkIcon from "../assets/bookmark-icon.svg";
import SettingsIcon from "../assets/settings_icon.png";

export default function BottomNavbar() {
  return (
    <>
      <div className="header sticky bottom-0 z-100 bg-stone-50 shadow-lg flex justify-evenly items-center gap-1 px-4 py-2 border-t-stone-100 border-t-1">
        <img className="scale-80" src={QuranMenuIcon} alt="" />
        <img className="scale-80" src={SholatIcon} alt="" />
        <img className="scale-80" src={BookmarkIcon} alt="" />
        <img className="scale-70 opacity-55" src={SettingsIcon} alt="" />
      </div>
    </>
  );
}
