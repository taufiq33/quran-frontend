import Tab from "../components/Tab";
import SettingTampilan from "../components/SettingTampilan";
import SettingQori from "../components/SettingQori";
import SettingLokasi from "../components/SettingLokasi";
import { scrollToTop } from "../utils/scrollUtils";
import { useEffect } from "react";

export default function SettingPage() {
  useEffect(() => scrollToTop(), []);
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
