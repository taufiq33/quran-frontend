import { useContext } from "react";
import { ARABIC_FONT_SIZE } from "../constant/ARABIC_FONT_SIZE";
import Ayah from "./Ayah";
import { appContext } from "../context/app-context";

const sampleAyah = {
  nomorAyat: 1,
  teksArab: "اِذَا زُلْزِلَتِ الْاَرْضُ زِلْزَالَهَاۙ",
  teksLatin: "iżā zulzilatil-arḍu zilzālahā.",
  teksIndonesia: "Apabila bumi diguncangkan dengan guncangan yang dahsyat,",
  audio: {
    "01": "https://equran.nos.wjv-1.neo.id/audio-partial/Abdullah-Al-Juhany/099001.mp3",
    "02": "https://equran.nos.wjv-1.neo.id/audio-partial/Abdul-Muhsin-Al-Qasim/099001.mp3",
    "03": "https://equran.nos.wjv-1.neo.id/audio-partial/Abdurrahman-as-Sudais/099001.mp3",
    "04": "https://equran.nos.wjv-1.neo.id/audio-partial/Ibrahim-Al-Dossari/099001.mp3",
    "05": "https://equran.nos.wjv-1.neo.id/audio-partial/Misyari-Rasyid-Al-Afasi/099001.mp3",
  },
};

export default function SettingTampilan() {
  const { settings, handleSaveSettings } = useContext(appContext);

  return (
    <div className="poppins-regular ">
      <div className="section-tampilan bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
        <h2 className="text-lg font-bold mb-1">Ukuran Teks Arab</h2>
        <div className="section-body p-2 flex flex-col gap-1">
          {Object.entries(ARABIC_FONT_SIZE).map(([key, value]) => {
            return (
              <div key={value} className="flex justify-start items-center">
                <input
                  name="font-size"
                  onChange={() =>
                    handleSaveSettings({
                      ...settings,
                      interfaceSetting: {
                        ...settings.interfaceSetting,
                        arabicFontSize: key,
                      },
                    })
                  }
                  defaultChecked={
                    key === settings.interfaceSetting.arabicFontSize
                  }
                  id={key}
                  value={key}
                  type="radio"
                  className="cursor-pointer w-4 h-4 accent-purple-600"
                />
                <label htmlFor={key} className="text-sm ml-2">
                  {key}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-tampilan bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
        <h2 className="text-lg font-bold mb-1">Tampilan</h2>
        <div className="section-body flex flex-col gap-2 p-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="transliterasi">Tampilkan Transliterasi</label>
            <input
              id="transliterasi"
              type="checkbox"
              className="cursor-pointer w-4 h-4 accent-purple-600"
              onChange={(e) =>
                handleSaveSettings({
                  ...settings,
                  interfaceSetting: {
                    ...settings.interfaceSetting,
                    showTransliteration: e.target.checked,
                  },
                })
              }
              defaultChecked={settings.interfaceSetting.showTransliteration}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="terjemahan">Tampilkan Terjemahan</label>
            <input
              id="terjemahan"
              type="checkbox"
              className="cursor-pointer w-4 h-4 accent-purple-600"
              onChange={(e) =>
                handleSaveSettings({
                  ...settings,
                  interfaceSetting: {
                    ...settings.interfaceSetting,
                    showTranslation: e.target.checked,
                  },
                })
              }
              defaultChecked={settings.interfaceSetting.showTranslation}
            />
          </div>
        </div>
      </div>
      <div className="section-tampilan bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
        <h2 className="text-lg font-bold mb-1">Preview</h2>
        <div className="section-body p-2">
          <Ayah {...settings.interfaceSetting} ayah={sampleAyah} />
        </div>
      </div>
    </div>
  );
}
