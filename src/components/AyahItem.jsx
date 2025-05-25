import ShareIcon from "../assets/share-icon.svg";
import PlayAudioIcon from "../assets/play-audio-icon.svg";
import BookmarkIconPurple from "../assets/bookmark-icon-purple.svg";

export default function AyahItem({ ayahData }) {
  return (
    <>
      <div className="ayah-item border-b-1 border-stone-300 mx-2 mt-4 p-2 flex flex-col gap-4">
        <div className="container-button-group bg-stone-100 flex items-center justify-between py-1 px-3 rounded-lg">
          <div className="ayah-marker text-xs border-0 p-4 rounded-full w-6 h-6 bg-purple-900 opacity-80 text-white flex justify-center items-center">
            <span>{ayahData.nomorAyat}</span>
          </div>
          <div className="button-group flex p-2 justify-center gap-6">
            <img src={ShareIcon} alt="" />
            <img src={PlayAudioIcon} alt="" />
            <img src={BookmarkIconPurple} alt="" />
          </div>
        </div>

        <div className="ayah-section flex flex-col gap-8">
          <div className="arabic-ayah arabic flex text-3xl text-right justify-end">
            <span>{ayahData.teksArab}</span>
          </div>

          <div className="translation-ayah italic text-sm text-stone-800">
            {ayahData.teksLatin}
          </div>

          <div className="translation-ayah text-sm text-stone-500">
            {ayahData.teksIndonesia}
          </div>
        </div>
      </div>
    </>
  );
}
