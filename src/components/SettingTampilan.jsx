import { useContext, useRef } from "react";
import { ARABIC_FONT_SIZE } from "../constant/ARABIC_FONT_SIZE";
import Ayah from "./Ayah";
import Notification from "./Modal/Notification";
import QuranMenuIcon from "../assets/quran-menu-icon.svg";

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
  const { settings, handleSaveSettings, userNameApp, saveUsername, showModal } =
    useContext(appContext);

  const usernameRef = useRef();

  function handleSaveUsername() {
    const newUserName = usernameRef.current.value;
    if (!newUserName) return;
    saveUsername(newUserName);
    showModal(
      <Notification
        title="Username tersimpan!"
        message="Perubahan username berhasil disimpan."
      />,
      true
    );
  }

  return (
    <div className="poppins-regular flex flex-col gap-1 ">
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

      <div className="section-tampilan bg-white p-4 border-transparent shadow-md m-2 rounded-xl">
        <h2 className="text-lg font-bold mb-1">Nama Pengguna</h2>
        <p className="text-sm mb-1">Rubah nama pengguna disini.</p>
        <div className="section-body flex gap-2 text-sm">
          <input
            className="border-1 border-stone-600 rounded-md p-1 w-3/4 sm:w-2/5"
            type="text"
            placeholder="Nama Pengguna"
            defaultValue={userNameApp}
            ref={usernameRef}
          />
          <button
            onClick={handleSaveUsername}
            className="p-2 w-1/4 sm:w-auto bg-purple-700 text-white text-sm rounded-md shadow-md"
          >
            Simpan
          </button>
        </div>
      </div>

      <div className="section-tampilan bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
        <h2 className="text-lg font-bold mb-1">Terakhir Dibaca</h2>
        <div className="section-body flex flex-col gap-2 p-2">
          <div>
            <p className="text-sm">
              Secara <b>default</b> fitur <i>Terakhir Dibaca</i> hanya menandai
              ayat jika anda klik tombol{" "}
              <span className="inline">
                <img className="inline scale-80" src={QuranMenuIcon} alt="" />
              </span>
              pada ayat yg diinginkan.
            </p>
          </div>
          <div className="flex justify-between items-center font-bold mt-4 text-sm">
            <label htmlFor="autoLastRead">
              Selalu tandai "terakhir dibaca" di setiap membuka halaman surat
            </label>
            <input
              id="autoLastRead"
              type="checkbox"
              className="cursor-pointer w-4 h-4 accent-purple-600 scale-110"
              onChange={(e) =>
                handleSaveSettings({
                  ...settings,
                  autoLastReadOnVisitedSurah: e.target.checked,
                })
              }
              defaultChecked={settings.autoLastReadOnVisitedSurah}
            />
          </div>
          <div className="rounded-md shadow-md p-1 pl-4 bg-stone-100 mt-4">
            <p className="italic text-sm">
              Jika diaktifkan, maka setiap kali anda membuka halaman surat
              tertentu, sistem akan mencatatnya sebagai 'terakhir dibaca'
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
