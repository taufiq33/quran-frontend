import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ListSurahPage from "./pages/ListSurahPage";
import Surah from "./pages/Surah";
import BookmarkPage from "./pages/BookmarkPage";
import SettingPage from "./pages/SettingPage";
import ErrorPage from "./pages/ErrorPage";
import AppContextProvider from "./provider/AppProvider";

import { loader as SurahLoader } from "./pages/Surah";
import { saveToLocalStorageSurahData } from "./helper/local-storage-helper";
import SholatPage from "./pages/SholatPage";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "list-surah",
        element: <ListSurahPage />,
      },
      {
        path: "sholat",
        element: <SholatPage />, // Placeholder for SholatPage component
      },
      {
        path: "surah/:number/:ayah?",
        element: <Surah />,
        loader: SurahLoader,
      },
      {
        path: "bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
    ],
  },
]);

function App() {
  if (!localStorage.getItem("surahData")) {
    saveToLocalStorageSurahData(0);
  }

  if (!localStorage.getItem("bookmark")) {
    localStorage.setItem(
      "bookmark",
      JSON.stringify([
        {
          collectionId: "default",
          collectionName: "My Favorite",
          lists: [],
        },
      ])
    );
  }

  if (!localStorage.getItem("settings")) {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        interfaceSetting: {
          arabicFontSize: "kecil",
          showTranslation: true,
          showTransliteration: true,
        },
        qori: "05",
        lokasi: "1425",
      })
    );
  }

  return (
    <main className="mb-20 max-w-xl md:max-w-4xl mx-auto lg:max-w-6xl px-2 md:px-4 lg:px-6 poppins-regular">
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </main>
  );
}

export default App;
