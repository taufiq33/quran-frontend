import { useState, useEffect } from "react";
import { appContext } from "../context/app-context";

export default function AppContextProvider({ children }) {
  const [listSurah, setListSurah] = useState([]);

  useEffect(() => {
    async function getListSurah() {
      const url = "https://equran.id/api/v2/surat";
      const request = await fetch(url);
      const response = await request.json();
      setListSurah(response.data);
    }

    getListSurah();
  }, []);

  const contextValue = {
    listSurah: listSurah,
    setListSurah: setListSurah,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
}
