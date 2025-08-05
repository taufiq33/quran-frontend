import { useState, useEffect, useCallback } from "react";
import { fetchListSurah } from "../helper/data-fetcher-helper";
import {
  setLocalStorageListSurah,
  getLocalStorageListSurah,
  saveBookmark,
  deleteBookmark,
  addNewCollection,
  renameCollection,
  deleteCollection,
  saveSettings,
  setUsername,
  getUsername,
} from "../helper/local-storage-helper";
import { appContext } from "../context/app-context";
import ModalDialog from "../components/Modal/ModalDialog";

export default function AppContextProvider({ children }) {
  const [listSurah, setListSurah] = useState([]);
  const [userNameApp, setUserNameApp] = useState(getUsername() || "");
  const [activeAyah, setActiveAyah] = useState({
    ayahNumber: null,
    surahNumber: null,
    surahName: null,
    totalAyah: null,
  });
  const [bookmark, setBookmark] = useState(
    JSON.parse(localStorage.getItem("bookmark"))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [autoCloseModal, setAutoCloseModal] = useState(false);
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {}
  );

  useEffect(() => {
    async function getListSurah() {
      const data = await fetchListSurah();
      setListSurah(data);
      setLocalStorageListSurah(data);
    }

    const localListSurah = getLocalStorageListSurah();
    if (!localListSurah) {
      getListSurah();
    } else {
      setListSurah(localListSurah);
    }
  }, []);

  const handleActiveAyahChange = useCallback(
    (ayahNumber, surahNumber, next = false) => {
      if (!next) {
        const currentSurah = listSurah.find(
          (item) => item.nomor === +surahNumber
        );
        const totalAyah = currentSurah?.jumlahAyat || null;

        if (totalAyah !== null && ayahNumber > totalAyah) return;

        setActiveAyah({
          ayahNumber,
          surahNumber: +surahNumber,
          surahName:
            listSurah.find((item) => item.nomor === +surahNumber)?.namaLatin ||
            null,
          totalAyah:
            listSurah.find((item) => item.nomor === +surahNumber)?.jumlahAyat ||
            null,
        });
      } else {
        setActiveAyah((prev) => {
          if (ayahNumber > prev.totalAyah) return prev;
          return {
            ...prev,
            ayahNumber: prev.ayahNumber + 1,
          };
        });
      }
    },
    [listSurah]
  );

  function replaceModalContent(newContent, autoClose = false) {
    // Reset modal state
    setModalOpen(false);
    setAutoCloseModal(false);

    // Gunakan requestAnimationFrame untuk memastikan state sudah ter-reset
    requestAnimationFrame(() => {
      setModalOpen(true);
      setModalContent(newContent);
      setAutoCloseModal(autoClose);
    });
  }

  const showModal = useCallback((content, autoClose) => {
    setModalOpen(true);
    autoClose && setAutoCloseModal(true);
    setModalContent(content);
  }, []);

  const closeModal = useCallback((fnCallback) => {
    if (fnCallback && typeof fnCallback === "function") {
      fnCallback();
    }
    setAutoCloseModal(false);
    setModalOpen(false);
    setModalContent("");
  }, []);

  function syncBookmark() {
    setBookmark(JSON.parse(localStorage.getItem("bookmark")));
  }

  function saveAndSyncBookmark(surahNumber, surahName, ayah, collectionId = 1) {
    const { error, message } = saveBookmark(
      surahNumber,
      surahName,
      ayah,
      collectionId
    );
    if (!error) {
      syncBookmark();
    }
    return {
      error,
      message,
    };
  }

  function deleteAndSyncBookmark(bookmarkId, collectionId) {
    deleteBookmark(bookmarkId, collectionId);
    syncBookmark();
  }

  function addNewCollectionAndSyncBookmark(collectionName) {
    addNewCollection(collectionName);
    syncBookmark();
  }

  function renameCollectionAndSyncBookmark(collectionId, newCollectionName) {
    renameCollection(collectionId, newCollectionName);
    syncBookmark();
  }

  function deleteCollectionAndSyncBookmark(collectionId) {
    deleteCollection(collectionId);
    syncBookmark();
  }

  function handleSaveSettings(newSettings) {
    setSettings(newSettings);
    saveSettings(newSettings);
  }

  function saveUsername(username) {
    setUserNameApp(username);
    setUsername(username);
  }

  const contextValue = {
    listSurah,
    bookmark,
    activeAyah,
    handleActiveAyahChange,
    setListSurah,
    showModal,
    closeModal,
    modalOpen,
    modalContent,
    replaceModalContent,
    saveAndSyncBookmark,
    deleteAndSyncBookmark,
    addNewCollectionAndSyncBookmark,
    renameCollectionAndSyncBookmark,
    deleteCollectionAndSyncBookmark,
    settings,
    handleSaveSettings,
    saveUsername,
    userNameApp,
  };

  return (
    <appContext.Provider value={contextValue}>
      <ModalDialog
        open={modalOpen}
        onClose={closeModal}
        autoClose={autoCloseModal}
      >
        {modalContent}
      </ModalDialog>
      {children}
    </appContext.Provider>
  );
}
