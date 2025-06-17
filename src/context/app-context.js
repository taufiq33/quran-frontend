import { createContext } from "react";

export const appContext = createContext({
  listSurah: [],
  setListSurah: () => {},
  showModal: () => {},
  closeModal: () => {},
  modalOpen: false,
  modalContent: "",
});
