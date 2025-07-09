import { useContext, useRef } from "react";
import { appContext } from "../context/app-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

const qori = [
  {
    id: "01",
    qori: "Abdullah Al-Juhany",
    audioUrl:
      "https://equran.nos.wjv-1.neo.id/audio-partial/Abdullah-Al-Juhany/055013.mp3",
  },
  {
    id: "02",
    qori: "Abdul Muhsin Al-Qasim",
    audioUrl:
      "https://equran.nos.wjv-1.neo.id/audio-partial/Abdul-Muhsin-Al-Qasim/055013.mp3",
  },
  {
    id: "03",
    qori: "Abdurrahman as-Sudais",
    audioUrl:
      "https://equran.nos.wjv-1.neo.id/audio-partial/Abdurrahman-as-Sudais/055013.mp3",
  },
  {
    id: "04",
    qori: "Ibrahim Al-Dossari",
    audioUrl:
      "https://equran.nos.wjv-1.neo.id/audio-partial/Ibrahim-Al-Dossari/055013.mp3",
  },
  {
    id: "05",
    qori: "Misyari Rasyid Al-Afasi",
    audioUrl:
      "https://equran.nos.wjv-1.neo.id/audio-partial/Misyari-Rasyid-Al-Afasi/055013.mp3",
  },
];

export default function SettingQori() {
  const { settings, handleSaveSettings } = useContext(appContext);
  const audioRefs = useRef({});

  function handlePlay(id) {
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset the audio to the beginning
      }
    });
    const audio = audioRefs.current[id];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  return (
    <div className="section-tampilan bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
      <h2 className="text-lg font-bold mb-1">Pilihan Qori</h2>
      <div className="section-body p-1 flex flex-col gap-2">
        {qori.map((item) => (
          <div
            key={item.id}
            className="hover:bg-stone-100 flex justify-between p-2 rounded-lg items-center gap-4 transition-all duration-200 "
          >
            <div key={item.id} className="flex justify-start items-center">
              <input
                onChange={(e) =>
                  handleSaveSettings({ ...settings, qori: e.target.value })
                }
                name="qori"
                id={item.id}
                type="radio"
                value={item.id}
                defaultChecked={settings.qori === item.id}
                className="cursor-pointer w-4 h-4 accent-purple-600"
              />
              <label htmlFor={item.id} className="text-sm ml-2 cursor-pointer">
                {item.qori}
              </label>
            </div>
            <div className="">
              <button
                className="flex items-center gap-1 text-purple-600 p-1 cursor-pointer hover:bg-purple-100 rounded-lg transition-all duration-200  "
                onClick={() => handlePlay(item.id)}
              >
                <FontAwesomeIcon icon={faPlayCircle} />
                <span className="text-sm">audio</span>
              </button>

              <audio
                ref={(el) => (audioRefs.current[item.id] = el)}
                className="hidden"
                onEnded={() => {
                  audioRefs.current[item.id].pause();
                  audioRefs.current[item.id].currentTime = 0;
                }}
                src={item.audioUrl}
              ></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
