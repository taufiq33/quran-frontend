import { createContext } from "react";

export const appContext = createContext({
  listSurah: [],
  bookmark: [],
  setListSurah: () => {},
  showModal: () => {},
  closeModal: () => {},
  modalOpen: false,
  modalContent: "",
  replaceModalContent: () => {},
  saveAndSyncBookmark: () => {},
  deleteAndSyncBookmark: () => {},
  addNewCollectionAndSyncBookmark: () => {},
  renameCollectionAndSyncBookmark: () => {},
  deleteCollectionAndSyncBookmark: () => {},
  settings: {},
  handleSaveSettings: () => {},
});
