import Tab from "../components/Tab";
import SettingTampilan from "../components/SettingTampilan";
import SettingQori from "../components/SettingQori";
import SettingLokasi from "../components/SettingLokasi";
import Tentang from "../components/Tentang";
import { scrollToTop } from "../utils/scrollUtils";
import { useEffect } from "react";
import useTitle from "../hooks/useTitle";

export default function SettingPage() {
  useEffect(() => scrollToTop(), []);
  useTitle("Pengaturan");
  return (
    <>
      <div className="poppins-regular">
        <Tab
          structure={[
            { title: "Aplikasi", body: <SettingTampilan /> },
            { title: "Qori", body: <SettingQori /> },
            { title: "Lokasi", body: <SettingLokasi /> },
            { title: "Tentang", body: <Tentang /> },
          ]}
        />
      </div>
    </>
  );
}
