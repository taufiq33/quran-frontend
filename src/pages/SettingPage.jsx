import SideMenuIcon from "../assets/side-menu-icon.svg";

import BottomNavbar from "../components/BottomNavbar";
import Tab from "../components/Tab";
import SettingTampilan from "../components/SettingTampilan";
import SettingQori from "../components/SettingQori";
import SettingLokasi from "../components/SettingLokasi";

export default function SettingPage() {
  return (
    <>
      <div className="poppins-regular">
        <div className="header sticky top-0 z-100 bg-stone-50 shadow flex justify-between items-center gap-6 px-4 py-2">
          <div className="flex gap-6">
            <img src={SideMenuIcon} alt="" className="" />
            <h1 className="text-purple-500 grayscale-50 font-bold text-lg ">
              Setting
            </h1>
          </div>
        </div>

        <Tab
          structure={[
            { title: "Tampilan", body: <SettingTampilan /> },
            { title: "Qori", body: <SettingQori /> },
            { title: "Lokasi", body: <SettingLokasi /> },
          ]}
        />

        <BottomNavbar />
      </div>
    </>
  );
}
