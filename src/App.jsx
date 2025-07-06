import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ListSurahPage from "./pages/ListSurahPage";
import Surah from "./pages/Surah";
import BookmarkPage from "./pages/BookmarkPage";
import SettingPage from "./pages/SettingPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppContextProvider from "./provider/AppProvider";

import { loader as SurahLoader } from "./pages/Surah";
import { saveToLocalStorageSurahData } from "./helper/local-storage-helper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/list-surah",
    element: <ListSurahPage />,
  },
  {
    path: "/surah/:number/:ayah?",
    element: <Surah />,
    loader: SurahLoader,
  },
  {
    path: "/bookmark",
    element: <BookmarkPage />,
  },
  {
    path: "/settings",
    element: <SettingPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
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
  return (
    <main className="mb-20">
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </main>
  );
}

export default App;
