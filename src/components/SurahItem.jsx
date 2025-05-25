import SurahMarker from "../assets/surah-marker.png";
export default function SurahItem({ surahData }) {
  return (
    <>
      <div className="surah-item p-1 flex justify-between items-center border-b-1 border-stone-200">
        <div className="surah-item-marker-title flex items-center gap-4 pb-4">
          <div
            className={`bg-no-repeat h-[36px] w-[36px] bg-cover flex justify-center items-center`}
            style={{ backgroundImage: `url(${SurahMarker})` }}
          >
            <span className="text-xs">{surahData.number}</span>
          </div>
          <div className="flex flex-col">
            <div className="surah-title text-stone-900 poppins-semibold">
              {surahData.name.transliteration.id}
            </div>
            <div className="surah-detail uppercase text-xs flex flex-col text-stone-500">
              <span className="scale-90">{surahData.name.translation.en}</span>
              <span className="scale-90">
                {surahData.numberOfVerses} verses
              </span>
            </div>
          </div>
        </div>

        <div className="text-purple-950 font-bold arabic-surah-title">
          {surahData.name.short}
        </div>
      </div>
    </>
  );
}
