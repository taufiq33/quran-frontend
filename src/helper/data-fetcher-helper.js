import {
  checkExistingSurahData,
  getLocalStorageSurahData,
  saveToLocalStorageSurahData,
} from "./local-storage-helper";

export async function fetchListSurah() {
  const url = "https://equran.id/api/v2/surat";
  const request = await fetch(url);

  if (!request.ok) {
    throw new Response(
      JSON.stringify({
        message: "failed to fetch list surah.",
      }),
      { status: 500 }
    );
  } else {
    const response = await request.json();
    return response.data;
  }
}

export async function fetchSurah(surahNumber) {
  if (checkExistingSurahData(surahNumber)) {
    return getLocalStorageSurahData(surahNumber);
  } else {
    const url = `https://equran.id/api/v2/surat/${surahNumber}`;
    const request = await fetch(url);

    if (!request.ok) {
      throw new Response(
        JSON.stringify({
          message: `failed to fetch surah number ${surahNumber}.`,
        }),
        { status: 500 }
      );
    } else {
      const response = await request.json();
      saveToLocalStorageSurahData(surahNumber, response.data);
      return response.data;
    }
  }
}
