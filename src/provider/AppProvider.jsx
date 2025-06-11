import { useState, useEffect } from "react";
import { fetchListSurah } from "../helper/data-fetcher-helper";
import { appContext } from "../context/app-context";

export default function AppContextProvider({ children }) {
  const [listSurah, setListSurah] = useState([]);

  useEffect(() => {
    async function getListSurah() {
      const data = await fetchListSurah();
      setListSurah(data);
      setLocalStorageListSurah(data);
    }

    function getLocalStorageListSurah() {
      return JSON.parse(localStorage.getItem("listSurah"));
    }

    function setLocalStorageListSurah(value) {
      return localStorage.setItem("listSurah", JSON.stringify(value));
    }

    const localListSurah = getLocalStorageListSurah();
    if (!localListSurah) {
      getListSurah();
    } else {
      setListSurah(localListSurah);
    }
  }, []);

  const contextValue = {
    listSurah: listSurah,
    setListSurah: setListSurah,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
}
