export function saveToLocalStorageSurahData(surahNumber, value = {}) {
  if (surahNumber === 0) {
    // 0, mean initial surahData value, since surahNumber start with 1
    return localStorage.setItem("surahData", JSON.stringify([]));
  }

  const existingSurahData = JSON.parse(localStorage.getItem("surahData"));

  if (!checkExistingSurahData(surahNumber)) {
    existingSurahData.push(value);
    localStorage.setItem("surahData", JSON.stringify(existingSurahData));
  } else {
    return;
  }
}

export function checkExistingSurahData(surahNumber) {
  const existingSurahData = JSON.parse(localStorage.getItem("surahData"));

  return (
    existingSurahData.filter((item) => item.nomor === parseInt(surahNumber))
      .length > 0 || false
  );
}

export function getLocalStorageSurahData(surahNumber) {
  const existingSurahData = JSON.parse(localStorage.getItem("surahData"));

  return (
    existingSurahData.filter(
      (item) => item.nomor === parseInt(surahNumber)
    )[0] || false
  );
}

export function getLocalStorageListSurah() {
  return JSON.parse(localStorage.getItem("listSurah"));
}

export function setLocalStorageListSurah(value) {
  return localStorage.setItem("listSurah", JSON.stringify(value));
}
