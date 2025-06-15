import { useState, useEffect } from "react";
import { fetchListSurah } from "../helper/data-fetcher-helper";
import {
  setLocalStorageListSurah,
  getLocalStorageListSurah,
} from "../helper/local-storage-helper";
import { appContext } from "../context/app-context";

export default function AppContextProvider({ children }) {
  const [listSurah, setListSurah] = useState([]);

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

  const contextValue = {
    listSurah,
    setListSurah,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
}
