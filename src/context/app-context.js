import { createContext } from "react";

export const appContext = createContext({
  listSurah: [],
  bookmark: [],
  activeAyah: null,
  handleActiveAyahChange: () => {},
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
  saveUsername: () => {},
  userNameApp: "",
});
