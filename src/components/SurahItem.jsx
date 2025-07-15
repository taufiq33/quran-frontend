import SurahMarker from "../assets/surah-marker.png";
export default function SurahItem({ surahData }) {
  return (
    <>
      <div className="surah-item md:rounded-lg md:border-1 md:border-purple-300 md:p-2 md:shadow-lg p-1 flex justify-between items-center border-b-1 border-stone-200 hover:bg-purple-100 ">
        <div className="surah-item-marker-title flex items-center gap-4 py-2 ">
          <div
            className={`bg-no-repeat h-[36px] w-[36px] bg-cover flex justify-center items-center`}
            style={{ backgroundImage: `url(${SurahMarker})` }}
          >
            <span className="text-xs">{surahData.nomor}</span>
          </div>
          <div className="flex flex-col items-start justify-start">
            <div className="surah-title text-stone-900 poppins-semibold">
              {surahData.namaLatin}
            </div>
            <div className="surah-detail text-sm flex flex-col text-stone-500">
              <span className="text-xs italic">{surahData.arti}</span>
              <span className="text-xs italic">
                {surahData.jumlahAyat} ayat
              </span>
            </div>
          </div>
        </div>

        <div className="text-purple-950 font-bold arabic arabic-surah-title">
          {surahData.nama}
        </div>
      </div>
    </>
  );
}
