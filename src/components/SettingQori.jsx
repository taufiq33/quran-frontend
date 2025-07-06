import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

const qori = [
  {
    id: "01",
    qori: "Abdullah Al-Juhany",
  },
  {
    id: "02",
    qori: "Abdul Muhsin Al-Qasim",
  },
  {
    id: "03",
    qori: "Abdurrahman as-Sudais",
  },
  {
    id: "04",
    qori: "Ibrahim Al-Dossari",
  },
  {
    id: "05",
    qori: "Misyari Rasyid Al-Afasi",
  },
];

export default function SettingQori() {
  return (
    <div className="section-tampilan bg-white p-2 border-transparent shadow-md m-2 rounded-xl">
      <h2 className="text-lg font-bold mb-1">Pilihan Qori</h2>
      <div className="section-body p-2 flex flex-col gap-4">
        {qori.map((item) => (
          <div className="flex justify-between">
            <div key={item.id} className="flex justify-start items-center">
              <input name="qori" id={item.id} type="radio" />
              <label htmlFor={item.id} className="text-sm ml-2">
                {item.qori}
              </label>
            </div>
            <div className="text-purple-600">
              <button>
                <FontAwesomeIcon icon={faPlayCircle} />
              </button>
              <span className="text-sm"> audio</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
