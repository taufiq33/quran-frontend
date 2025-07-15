import SideMenuIcon from "../assets/side-menu-icon.svg";

import BottomNavbar from "../components/BottomNavbar";
import Tab from "../components/Tab";
import SettingTampilan from "../components/SettingTampilan";
import SettingQori from "../components/SettingQori";
import SettingLokasi from "../components/SettingLokasi";
import Header from "../components/Header";

export default function SettingPage() {
  return (
    <>
      <div className="poppins-regular">
        <Header title="Setting" additionalMargin={false} />

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
