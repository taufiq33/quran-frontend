import { createContext } from "react";

export const appContext = createContext({
  listSurah: [],
  setListSurah: () => {},
});
