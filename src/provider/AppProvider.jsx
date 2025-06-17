import { useState, useEffect } from "react";
import { fetchListSurah } from "../helper/data-fetcher-helper";
import {
  setLocalStorageListSurah,
  getLocalStorageListSurah,
} from "../helper/local-storage-helper";
import { appContext } from "../context/app-context";
import ModalDialog from "../components/ModalDialog";
import { useCallback } from "react";

export default function AppContextProvider({ children }) {
  const [listSurah, setListSurah] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [autoCloseModal, setAutoCloseModal] = useState(false);

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

  const showModal = useCallback((content, autoClose) => {
    setModalOpen(true);
    autoClose && setAutoCloseModal(true);
    setModalContent(content);
  }, []);

  const closeModal = useCallback((fnCallback = null) => {
    if (fnCallback) fnCallback();
    setAutoCloseModal(false);
    setModalOpen(false);
    setModalContent("");
  }, []);

  const contextValue = {
    listSurah,
    setListSurah,
    showModal,
    closeModal,
    modalOpen,
    modalContent,
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
