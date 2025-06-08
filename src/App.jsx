import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ListSurahPage from "./pages/ListSurahPage";
import Surah from "./pages/Surah";
import BookmarkPage from "./pages/BookmarkPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppContextProvider from "./provider/AppProvider";

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
    path: "/surah/:number",
    element: <Surah />,
  },
  {
    path: "/bookmark",
    element: <BookmarkPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  if (!localStorage.getItem("surahData")) {
    localStorage.setItem("surahData", JSON.stringify([]));
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
