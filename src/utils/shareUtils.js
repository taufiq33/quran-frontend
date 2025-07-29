export async function share(ayahObject, withTransliteration = false) {
  const {
    nomorSurah,
    namaSurat,
    nomorAyat,
    teksArab,
    teksLatin,
    teksIndonesia,
  } = ayahObject;

  console.log(withTransliteration);

  let templateTextShare = `\nAl-Qur'an Surat ${namaSurat} ayat ${nomorAyat} :\n\n${teksArab}\n\n${
    withTransliteration ? teksLatin : ""
  }\n\nartinya : ${teksIndonesia}. (${nomorSurah}:${nomorAyat})\n\nBaca selengkapnya di: `;

  if (navigator.share) {
    console.log("Sharing via Web Share API");
    await navigator
      .share({
        title: `Al-Qur'an Surat ${namaSurat} ayat ${nomorAyat}`,
        text: templateTextShare,
        url: ` ${window.location.origin}/surah/${nomorSurah}/${nomorAyat}`,
      })
      .catch((error) => alert("Error sharing:", error));
  } else {
    navigator.clipboard
      .writeText(
        templateTextShare +
          `${window.location.origin}/surah/${nomorSurah}/${nomorAyat}`
      )
      .then(() => {
        alert("Teks ayat berhasil disalin ke clipboard!");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        alert("Gagal menyalin teks ayat ke clipboard.");
      });
  }
}
