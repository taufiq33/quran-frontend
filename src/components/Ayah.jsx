export default function Ayah({ ayah }) {
  return (
    <div className="ayah-section flex flex-col gap-8">
      <div className="arabic-ayah arabic flex text-3xl text-right justify-end">
        <span>{ayah.teksArab}</span>
      </div>

      <div className="translation-ayah italic text-sm text-stone-800">
        {ayah.teksLatin}
      </div>

      <div className="translation-ayah text-sm text-stone-500">
        {ayah.teksIndonesia}
      </div>
    </div>
  );
}
