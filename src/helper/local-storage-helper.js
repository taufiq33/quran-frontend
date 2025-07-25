function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}

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

export function saveLastReadSurah(surahNumber = 0, ayah) {
  if (surahNumber === 0) return localStorage.setItem("lastReadSurah", null);
  return localStorage.setItem(
    "lastReadSurah",
    JSON.stringify({
      surahNumber,
      ayah,
    })
  );
}

export function getLastReadSurah() {
  return JSON.parse(localStorage.getItem("lastReadSurah")) || null;
}

export function getUsername() {
  return localStorage.getItem("username") || null;
}

export function setUsername(name) {
  return localStorage.setItem("username", name);
}

export function saveBookmark(
  surahNumber,
  surahName,
  ayah,
  collectionId = "default"
) {
  const newBookmark = {
    id: `${collectionId}@${surahNumber}-${ayah}`,
    surahNumber,
    ayah,
    surahName,
  };

  const collections = JSON.parse(localStorage.getItem("bookmark"));

  const addedCollection = collections.find(
    (item) => item.collectionId === collectionId
  );

  const bookmarkExisting = addedCollection.lists.find(
    (item) => item.id === newBookmark.id
  );

  if (!bookmarkExisting) {
    addedCollection.lists.push(newBookmark);
    const newCollections = collections.map((item) => {
      if (item.collectionId === addedCollection.collectionId) {
        return addedCollection;
      } else {
        return item;
      }
    });

    localStorage.setItem("bookmark", JSON.stringify(newCollections));
    return {
      error: 0,
      message: `Surat ${surahName} ayat ${ayah} berhasil ditambahkan ke folder bookmark  ${addedCollection.collectionName}`,
    };
  } else {
    return {
      error: 1,
      message: `Surat ${surahName} ayat ${ayah} sudah tersedia di folder bookmark ${addedCollection.collectionName}`,
    };
  }
}

export function deleteBookmark(bookmarkId, collectionId) {
  const collections = JSON.parse(localStorage.getItem("bookmark")).map(
    (collection) => {
      if (collection.collectionId === collectionId) {
        const newCollection = {
          ...collection,
          lists: collection.lists.filter(
            (bookmark) => bookmark.id !== bookmarkId
          ),
        };
        return newCollection;
      } else {
        return collection;
      }
    }
  );

  localStorage.setItem("bookmark", JSON.stringify(collections));
}

export function addNewCollection(collectionName) {
  if (collectionName.length < 1) return;
  const newCollection = {
    collectionId: generateId(),
    collectionName,
    lists: [],
  };

  const collections = JSON.parse(localStorage.getItem("bookmark"));
  collections.push(newCollection);

  localStorage.setItem("bookmark", JSON.stringify(collections));
}

export function renameCollection(collectionId, newCollectionName) {
  if (newCollectionName.length < 1) return;

  const collections = JSON.parse(localStorage.getItem("bookmark")).map(
    (collection) => {
      if (collection.collectionId === collectionId) {
        const newCollection = {
          ...collection,
          collectionName: newCollectionName,
        };

        return newCollection;
      } else {
        return collection;
      }
    }
  );

  localStorage.setItem("bookmark", JSON.stringify(collections));
}

export function deleteCollection(collectionId) {
  const collections = JSON.parse(localStorage.getItem("bookmark")).filter(
    (collection) => collection.collectionId !== collectionId
  );

  localStorage.setItem("bookmark", JSON.stringify(collections));
}

export function saveSettings(settingsObject) {
  const newSettings = {
    ...settingsObject,
    id: generateId(),
  };
  localStorage.setItem("settings", JSON.stringify(newSettings));
}
