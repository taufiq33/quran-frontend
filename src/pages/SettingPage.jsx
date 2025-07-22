import BottomNavbar from "../components/BottomNavbar";
import Tab from "../components/Tab";
import SettingTampilan from "../components/SettingTampilan";
import SettingQori from "../components/SettingQori";
import SettingLokasi from "../components/SettingLokasi";

export default function SettingPage() {
  return (
    <>
      <div className="poppins-regular">
        <Tab
          structure={[
            { title: "Tampilan", body: <SettingTampilan /> },
            { title: "Qori", body: <SettingQori /> },
            { title: "Lokasi", body: <SettingLokasi /> },
          ]}
        />
      </div>
    </>
  );
}
