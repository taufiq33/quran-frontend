import { ARABIC_FONT_SIZE } from "../constant/ARABIC_FONT_SIZE";

export default function Ayah({
  ayah,
  arabicFontSize = "normal",
  showTranslation = true,
  showTransliteration = true,
}) {
  return (
    <div className="ayah-section flex flex-col gap-8">
      <div className={`arabic-ayah arabic flex text-right justify-end `}>
        <span className={`${ARABIC_FONT_SIZE[arabicFontSize]}`}>
          {ayah.teksArab}
        </span>
      </div>

      {showTransliteration && (
        <div className="translation-ayah italic text-sm text-stone-800">
          {ayah.teksLatin}
        </div>
      )}

      {showTranslation && (
        <div className="translation-ayah text-sm text-stone-500">
          {ayah.teksIndonesia}
        </div>
      )}
    </div>
  );
}
