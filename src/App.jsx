import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ListSurahPage from "./pages/ListSurahPage";
import Surah from "./pages/Surah";
import BookmarkPage from "./pages/BookmarkPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/surah",
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
  return (
    <main className="mb-20">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
